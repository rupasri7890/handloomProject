from fastapi import APIRouter
from app.api.endpoints import  health_check


router = APIRouter()
router.include_router(health_check.router)
