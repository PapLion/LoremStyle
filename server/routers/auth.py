from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from pathlib import Path

app = APIRouter()

@app.get("/join", response_class=HTMLResponse)
def auth_page():
    path = Path('../Client/static/Html/Auth/Auth.html')
    return path.read_text(encoding='utf-8')