from fastapi import APIRouter
from fastapi.responses import HTMLResponse, RedirectResponse
from pathlib import Path
from database.queries import SearchQueries

app = APIRouter()

@app.get("/catalog", response_class=HTMLResponse)
async def catalog_page():
    path = Path('../Client/static/Html/Catalog.html')
    return path.read_text(encoding='utf-8')

@app.get("/get_items")
async def get_all_items():
    sq = SearchQueries()
    items = await sq.all_items()
    return items
