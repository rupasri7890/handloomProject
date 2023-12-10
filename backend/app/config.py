import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    DB_NAME: str = os.getenv('DB_NAME')
    CONNECTION_STRING: str = os.getenv('CONNECTION_STRING')
    USERS: str = os.getenv('USERS')
    CODES:str=os.getenv("CODES")

    class Config:
        case_sensitive = True


settings = Settings()