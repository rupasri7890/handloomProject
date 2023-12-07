from fastapi import APIRouter
from app.api.endpoints import  health_check,authentication


router = APIRouter()
router.include_router(health_check.router)
router.include_router(authentication.router)