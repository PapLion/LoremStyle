from fastapi import APIRouter, HTTPException, status
from fastapi.responses import HTMLResponse
from models import authenticate_model
from pathlib import Path
from database.queries import InsertQueries, SearchQueries
from database.data_hashed import hash_data, check_password_hash
from JWT.functions_jwt import write_token

app = APIRouter()

@app.get("/join", response_class=HTMLResponse)
async def auth_page():
    path = Path('../Client/static/Html/Auth/Auth.html')
    return path.read_text(encoding='utf-8')


@app.post("/join_request")
async def join_request(form: authenticate_model):
    """
    Handle user join request.

    This function determines whether the user is attempting to register or log in 
    based on the existence of the `name` field in the provided form.
    
    - If `form.name` exists and is a string:
        - It initiates the registration system.
        - It checks if the email already exists in the database.
        - If the email does not exist, it creates a new user.
        - The password is securely stored using hashing.
        - An authentication token is returned with a status code of 201 (Created).
    
    - If `form.name` does not exist:
        - It initiates the login system.
        - It verifies the existence of the account using the email.
        - If the account does not exist, an HTTP 404 (Not Found) exception is raised.
        - If the account exists, the password is verified.
        - If the password is incorrect, an HTTP 409 (Conflict) exception is raised.
        - If authentication is successful, an authentication token is returned with a status code of 200 (OK).
    
    Parameters:
    - form (authenticate_model): Contains user data such as name, email, and password.
    
    Returns:
    - HTTP response with the appropriate status code:
        - 201: User created successfully.
        - 200: User authenticated successfully.
        - 404: Account not found.
        - 409: Conflict, either the account exists or the password is incorrect.
    """
    # register system
    if isinstance(form.name, str):  
        iq = InsertQueries()
        check_user = await user_already_exist(form.email)
        if isinstance(check_user, dict):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Account already exist"
            )
        hashed_password = hash_data(form.password)
        await iq.insert_user(
            name=form.name,
            email=form.email,
            password=hashed_password
        )
        sq = SearchQueries()
        data = await sq.user_data(form.email)
        token = write_token(data=data)
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail=token
        )

    # login system
    sq = SearchQueries()
    data = await sq.user_data(form.email)

    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not exist"
        )

    check_response = await check_password(
        password=data['password'],
        form=form
    )

    if isinstance(check_response, str):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=check_response
        )

    token = write_token(data=data)
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail=token
    )

async def check_password(password:str, form: authenticate_model):
    """This function checks if the password entered is the same as the one in the database."""

    password_compare = check_password_hash(
        pwhash=password, 
        password=form.password)
    
    if not password_compare:
        return "Wrong password"
    else:
        return True

async def user_already_exist(email:str):
    """This function checks if a user already exists using the email address."""
    sq = SearchQueries()
    search_user: dict | None = await sq.user_data(email=email)
    return search_user