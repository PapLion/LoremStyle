from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from pathlib import Path

app = APIRouter()

@app.get("/car", response_class=HTMLResponse)
async def car_page():
    path = Path('../Client/static/Html/Car.html')
    return path.read_text(encoding='utf-8')