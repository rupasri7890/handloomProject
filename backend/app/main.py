from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from mangum import Mangum
origins = ['*']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Define the CSP middleware
app.include_router(router)
handler = Mangum(app)
