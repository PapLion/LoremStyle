from pydantic import BaseModel
from typing import Optional

class authenticate_model(BaseModel):
    name: Optional[str]
    email: str
    password: str