from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from pathlib import Path

app = APIRouter()

@app.get("/support", response_class=HTMLResponse)
async def support_page():
    path = Path('../Client/static/Html/support.html')
    return path.read_text(encoding='utf-8')