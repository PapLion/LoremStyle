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
    status: str
    image: str
    clothe_type: str
    public: str
    release_date: str
    popularity: int

class item_delete_model(BaseModel):
    id: int
