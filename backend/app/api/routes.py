from fastapi import APIRouter
from app.api.endpoints import  health_check,authentication,weaer


router = APIRouter()
router.include_router(health_check.router)
router.include_router(authentication.router)
router.include_router(weaer.router)