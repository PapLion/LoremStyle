from fastapi import APIRouter, HTTPException, status
from fastapi.responses import HTMLResponse
from pathlib import Path
from models import item_create_model, item_delete_model
from database.queries import InsertQueries, dropQueries

app = APIRouter()

@app.post("/item_insert")
async def car_page(item: item_create_model):
    iq = InsertQueries()
    response = await iq.insert_item(
                name=item.name,
                price=item.price,
                category=item.category,
                status=item.status,
                image=item.image,
                clothe_type=item.clothe_type,
                public=item.public,
                release_date=item.release_date,
                popularity=item.popularity,
            )

    if not response:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Something has gone wrong"
        )
    
    raise HTTPException(
        status_code=status.HTTP_201_CREATED,
        detail=response
    )

@app.post('/item_delete')
async def item_delete(item: item_delete_model):
    dq = dropQueries()
    response = await dq.row_drop(
                id=item.id,
                table='items'
            )

    if not response:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Something has gone wrong"
        )
    
    raise HTTPException(
        status_code=status.HTTP_202_ACCEPTED,
        detail="It's ok"
    )
