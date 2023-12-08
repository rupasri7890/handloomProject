from fastapi import APIRouter, HTTPException,status
from app.config import settings
from app.db.sesson import create_mongodb_client
from app.schemas.schema import User ,Login
from app.api.endpoints.utils import Hasher
from app.utils.logger import logger

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
                return {"message": "user login scussfully","status_code":200}
            else:
                return {"message": "Invalid  password","status_code":401}
        else:
            return {"message": "user doesnot exist ,please sign up","status_code":404}
           
    except Exception as e:
        logger.error(f"Error inserting data: {str(e)}")
        return {"message": f"Error: {str(e)}"}
