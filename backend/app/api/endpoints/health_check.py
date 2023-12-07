from fastapi import APIRouter

router = APIRouter(
    tags=["User"],
)


@router.get("/earthpit")
async def health_check():
    return {"message": "running fine"}