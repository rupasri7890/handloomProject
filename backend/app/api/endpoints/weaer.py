from fastapi import APIRouter, HTTPException,status
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

from app.config import settings
from app.db.sesson import create_mongodb_client
from app.schemas.schema import User ,Login,ConfirmPasaword,ResetPassword,AddProduct,Subscription
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
@router.get("/weaver/getProductsByEmail/{email}",status_code=status.HTTP_201_CREATED)                                                                                                                                                                                                                                                                                               
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
@router.post("/weaver/subscription",status_code=status.HTTP_201_CREATED)                                                                                                                                                                                                                                                                                               
async def getProductsByEmail(info:Subscription):
    sender_email = "rupasri646@sasi.ac.in"
    sender_password = "Rupa@6268"
    print(info.productImage)


    # HTML content for the email body
    html = f"""
    <html>
    <body>
        <p>Dear Product Owner,</p>
        <p>A user has expressed interest in your product. Below are the details:</p>
        
        <h2>Product Details:</h2>
        
        <p><strong>Product Name:</strong> {info.productName}</p>
        <p><strong>Price:</strong> {info.price}</p>
        <p><strong>Color:</strong> {info.color}</p>
        <p><strong>Description:</strong> {info.description}</p>    
        <img src={info.productImage} alt="device" style={{maxWidth: '100%', borderRadius: '8px'}} />
        <h3>Contact Information:</h3>
        <p><strong>Email:</strong> {info.user_email}</p>
        <p><strong>Phone Number:</strong> {info.phone_number}</p>
    </body>
    </html>
    """

    msg = MIMEMultipart()
    msg['Subject'] = 'Interest Notification: User Inquired About Your Product'
    msg['From'] = "handloomsproject@gmail.com"
    msg['To'] = info.email
    msg.attach(MIMEText(html, 'html'))


    try:
# Establish a connection to the SMTP server (in this case, Gmail's SMTP server)
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()  # Start TLS encryption
            smtp.login(sender_email, sender_password)
            smtp.send_message(msg)

        
        return {"message": "Email sent successfully!", "status_code": 201}
    except Exception as e:
        return {"message": f"Failed to send email. Error: {str(e)}"}
@router.get("/weaver/getAllProducts",status_code=status.HTTP_201_CREATED)                                                                                                                                                                                                                                                                                               
async def getProductsByEmail():
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.PRODUCTS)
        result = collection.find({},projection={"_id": 0})
        return list(result)
        
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}
