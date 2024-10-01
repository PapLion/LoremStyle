from fastapi import APIRouter, HTTPException, status
from fastapi.responses import HTMLResponse
from database.queries import SearchQueries
from pathlib import Path

app = APIRouter()

@app.get("/home", response_class=HTMLResponse)
async def home_page():
    """Renders the home page.

    Returns:
        str: The HTML content of the home page.
    """
    path = Path('../Client/static/index.html')
    return path.read_text(encoding='utf-8')


@app.get("/latest_items")
async def get_latest_items():
    """Retrieves the latest items from the database.

    Raises:
        HTTPException: If no items exist, raises an exception with status code 204.
        HTTPException: If items exist, raises an exception with status code 200 and the items as detail.

    Returns:
        None: This method does not return a direct value but raises exceptions based on the case.
    """
    sq = SearchQueries()
    latest_items = await sq.latest_items()
    
    if latest_items is None:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT,
            detail="No items exist"
        )
    
    raise HTTPException(
        status_code=status.HTTP_200_OK,
        detail=latest_items
    )

