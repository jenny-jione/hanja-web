from fastapi import FastAPI
from sqlalchemy import event, DDL
from server.router.check import router_check
from .models import UserTable
from .database import Base, engine

init_insert_sql = """
INSERT INTO users (user_id, password, user_name, birthday)
VALUES ('jenny', '1234', '장지원', '1995-10-27')
"""
event.listen(UserTable.__table__, 'after_create', DDL(init_insert_sql))
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

def get_server():
    server = FastAPI(
        title="happi",
        docs_url="/docs",
        redoc_url=None
    )
    server.include_router(router_check)
    
    return server

app = get_server()