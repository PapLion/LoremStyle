from fastapi import APIRouter, Depends, HTTPException, status
import json
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.responses import HTMLResponse, JSONResponse
from pathlib import Path
from database.queries import InsertQueries, SearchQueries
from models import cart
from JWT.functions_jwt import validate_token

app = APIRouter(prefix='/cart')
security = HTTPBearer()

@app.get("/", response_class=HTMLResponse)
async def cart_page():
    path = Path('../Client/static/Html/Cart.html')
    return path.read_text(encoding='utf-8')

@app.get("/get_items_cart")
async def get_items_cart(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    response = validate_token(token)
    #return response

    if isinstance(response, JSONResponse):
        json_data = json.loads(response.body.decode('UTF-8'))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=json_data['message']
        )

    sq = SearchQueries()
    items = await sq.items_cart(response['id'])
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail=items
    )

    

@app.post("/add_to_cart")
async def add_to_cart(cart: cart):
    iq = InsertQueries()
    await iq.insert_cart(
        user_id=cart.user_id, 
        item_id=cart.item_id,
        quantity=cart.quantity
    )
    
@app.post("/delete_to_cart")
async def delete_to_cart(cart: cart):
    iq = InsertQueries()
    await iq.delete_cart(
        user_id=cart.user_id, 
        item_id=cart.item_id)

@app.get("/payment", response_class=HTMLResponse)
async def cart_payment():
    path = Path('../Client/static/Html/Cart/Payment.html')
    return path.read_text(encoding='utf-8')

@app.get("/payment/complete", response_class=HTMLResponse)
async def cart_payment_complete():
    path = Path('../Client/static/Html/Cart/Complete.html')
    return path.read_text(encoding='utf-8')

@app.get("/payment/process", response_class=HTMLResponse)
async def cart_payment_process():
    path = Path('../Client/static/Html/Cart/Process.html')
    return path.read_text(encoding='utf-8')


