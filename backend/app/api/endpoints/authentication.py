from fastapi import APIRouter, HTTPException,status
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

from app.config import settings
from app.db.sesson import create_mongodb_client
from app.schemas.schema import User ,Login,ConfirmPasaword,ResetPassword
from app.api.endpoints.utils import Hasher
from app.utils.logger import logger
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random


import  yagmail



router = APIRouter(
    tags=["user"],
)


@router.post("/authentication/createUser",status_code=status.HTTP_201_CREATED)
async def createUser(info:User):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.USERS)
        result =collection.find_one({"email":info.email},projection={"_id": 0})
        if result:
            return {"message": "user alredy exist","status_code":409}
        else:
            encryptPawword=Hasher()
            password=info.password
            enPassowrd=encryptPawword.get_password_hash(password)
            info.password=enPassowrd
            res=collection.insert_one(info.dict())
        return {"message":"user created successfully!","status_code":201}
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}
@router.post("/authentication/login",status_code=status.HTTP_201_CREATED)
async def loginUser(info:Login):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.USERS)
        result =collection.find_one({"email":info.email},projection={"_id": 0})
        if result:
            verifyPassword=Hasher()
            validOrNot=verifyPassword.verify_password(info.password,result.get("password"))
            if(validOrNot==True):
                return {"message": "user login scussfully","status_code":200,"role":result.get("role")}
            else:
                return {"message": "Invalid  password","status_code":401}
        else:
            return {"message": "user doesnot exist ,please sign up","status_code":404}
           
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}

@router.put("/authentication/forgotPassword/{email}")
async def forgotPassword(email: str):
    sender_email = "rupasri646@sasi.ac.in"
    sender_password = "Rupa@6268"

    code = random.randint(1000, 9999)

    # HTML content for the email body
    html = f"""
    <html>
    <body>
    <p>Dear User,</p>
    <p>Reset your password with this code: <strong>{code}</strong></p>
    </body>
    </html>
    """

    msg = MIMEMultipart()
    msg['Subject'] = 'Reset your password'
    msg['From'] = "handloomsproject@gmail.com"
    msg['To'] = email
    msg.attach(MIMEText(html, 'html'))


    try:
# Establish a connection to the SMTP server (in this case, Gmail's SMTP server)
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()  # Start TLS encryption
            smtp.login(sender_email, sender_password)
            smtp.send_message(msg)

        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.CODES)
        collection.delete_one({"email": email})
        collection.insert_one({"email": email, "code": code})
        
        return {"message": "Email sent successfully!", "status_code": 201}
    except Exception as e:
        return {"message": f"Failed to send email. Error: {str(e)}"}

@router.post("/authentication/confirmPassword")
async def confirmPassword(info:ConfirmPasaword):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        collection = db.get_collection(settings.CODES)
        updatePassword=db.get_collection(settings.USERS)
        result=collection.find_one({"email":info.email,"code":info.code})
        if result:
            updatePassword.update_one({"email":info.email},{"$set":{"password":Hasher().get_password_hash(info.password)}})
            return {"message": "updated passowrd successfully!","status_code":200}
        else:
            return {"message": "invalid code please try again","status_code":400}
    except Exception as e:
        return {"message": f"Failed to send email. Error: {str(e)}"}
@router.post("/authentication/resetPassword")
async def confirmPassword(info:ResetPassword):
    try:
        client = create_mongodb_client()
        db = client[settings.DB_NAME]
        updatePassword=db.get_collection(settings.USERS)
        result=updatePassword.find_one({"email":info.email})
        verifyPassword=Hasher()
        validOrNot=verifyPassword.verify_password(info.currentPassword,result.get("password"))
        if(validOrNot==True):
            updatePassword.update_one({"email":info.email},{"$set":{"password":Hasher().get_password_hash(info.newPassword)}})
            return {"message": "updated passowrd successfully!","status_code":200}
        else:
            return {"message": "invalid passowrd please try again","status_code":400}
    except Exception as e:
        return {"message": f"Failed to send email. Error: {str(e)}"}




