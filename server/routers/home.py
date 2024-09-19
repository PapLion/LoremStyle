from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from pathlib import Path

app = APIRouter()

@app.get("/home", response_class=HTMLResponse)
async def home_page():
    path = Path('../Client/static/index.html')
    return path.read_text(encoding='utf-8')