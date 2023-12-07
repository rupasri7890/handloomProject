from pymongo import MongoClient
from app.config import settings
from app.utils.logger import logger
connection_string = settings.CONNECTION_STRING
def create_mongodb_client():
    try:
        client = MongoClient(connection_string)
        logger.info("MongoDB client created successfully.")
        return client
    except Exception as e:
        logger.error(f"Error creating MongoDB client: {e}")
        raise e