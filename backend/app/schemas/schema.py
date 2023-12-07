from pydantic import BaseModel,Extra
from typing import List, Dict, Optional

class User(BaseModel):
    first_name:str
    last_name:str
    email:str
    password:str
    phone_number:str
    address: Optional[str]=None
    