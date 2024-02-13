from pydantic import BaseModel,Extra
from typing import List, Dict, Optional

class User(BaseModel):
    first_name:str
    last_name:str
    email:str
    password:str
    phone_number:str
    address: Optional[str]=None
    role: str
class Login(BaseModel):
    email: str
    password: str
class ConfirmPasaword(BaseModel):
    email: str
    password: str
    code : int 
class ResetPassword(BaseModel):
    email: str
    currentPassword:str
    newPassword:str
class AddProduct(BaseModel):
    id:Optional[str]=None
    email: str
    productName: str
    productImage: str
    price: str
    color: str
    description: str
class Subscription(BaseModel):
    email: str
    productName: str
    price: str
    color: str
    description: str
    phone_number: str
    user_email:str
    productImage:str
    
    