from fastapi import APIRouter
from app.config import settings
from app.db.sesson import create_mongodb_client

router = APIRouter(
    tags=["User"],
)


@router.get("/earthpit")
async def health_check():
    client = create_mongodb_client()
    db = client[settings.DB_NAME]
    collection = db.get_collection(settings.USERS)
    result =collection.find({},projection={"_id": 0})
    res=[]
    for i in result:
        res.append(i)
    return res
