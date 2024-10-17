from pydantic import BaseModel
from typing import Optional

class authenticate_model(BaseModel):
    name: Optional[str]
    email: str
    password: str

class item_create_model(BaseModel):
    name: str
    price: float
    category: str
    condition: str
    image: str
    clothe_type: str
    audience: str
    release_date: str
    popularity: int

class token_user(BaseModel):
    token: str

class item_delete_model(BaseModel):
    id: int

class cart(BaseModel):
    item_id: int
    token: str
    quantity: Optional[int]
