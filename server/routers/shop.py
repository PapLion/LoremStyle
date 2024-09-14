from fastapi import APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path

app = APIRouter(prefix='/home')

@app.get("/accessories", response_class=HTMLResponse)
def car_page():
    path = Path('../Client/static/Html/Shop/accessories.html')
    return path.read_text(encoding='utf-8')

@app.get("/dresses", response_class=HTMLResponse)
def car_page():
    path = Path('../Client/static/Html/Shop/dresses.html')
    return path.read_text(encoding='utf-8')

@app.get("/pants", response_class=HTMLResponse)
def car_page():
    path = Path('../Client/static/Html/Shop/pants.html')
    return path.read_text(encoding='utf-8')

@app.get("/shirts", response_class=HTMLResponse)
def car_page():
    path = Path('../Client/static/Html/Shop/shirts.html')
    return path.read_text(encoding='utf-8')

