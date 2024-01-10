from fastapi import APIRouter, HTTPException,status
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

from app.config import settings
from app.db.sesson import create_mongodb_client
from app.schemas.schema import User ,Login,ConfirmPasaword,ResetPassword,AddProduct
from app.api.endpoints.utils import Hasher
from app.utils.logger import logger
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import uuid
router = APIRouter(
    tags=["weaver"],
)
@router.post("/weaver/createProduct",status_code=status.HTTP_201_CREATED)
async def addProduct(info:AddProduct):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.PRODUCTS)
        result =collection.find_one({"productName":info.productName},projection={"_id": 0})
        info.id=str(uuid.uuid4())
        if result:
            return {"message": "productName alredy exist","status_code":409}
        else:
            res=collection.insert_one(info.dict())
        return {"message":"product added   successfully!","status_code":201}
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}
@router.get("/weaver/getProductsByEmail",status_code=status.HTTP_201_CREATED)
async def getProductsByEmail(email:str):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.PRODUCTS)
        result = collection.find({"email":email},projection={"_id": 0})
        return list(result)
        
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}
@router.get("/weaver/getProductById/{id}",status_code=status.HTTP_201_CREATED)
async def getProductsByEmail(id:str):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.PRODUCTS)
        result = collection.find_one({"id":id},projection={"_id": 0})
        return result
        
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}
@router.put("/weaver/updateProductById/{id}",status_code=status.HTTP_201_CREATED)
async def updateProductById(info:AddProduct,id:str):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.PRODUCTS)
        info.id=id
        result = collection.update_one({"id":id},{"$set":info.dict()})
        return {"message":"product updated   successfully!","status_code":201}

        
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}
@router.delete("/weaver/deleteProductById/{id}",status_code=status.HTTP_201_CREATED)
async def deleteProductById(id:str):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.PRODUCTS)
        result = collection.delete_one({"id":id})
        return {"message":"product deleted successfully!","status_code":201}

        
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}

