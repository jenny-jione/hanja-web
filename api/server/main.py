from fastapi import FastAPI
from sqlalchemy import event, DDL
from server.router.user import router_user
from server.router.han import router_han
from server.router.ini import router_ini
from .models import UserTable
from .database import Base, engine
from .init import *

init_insert_sql = """
INSERT INTO users (user_id, password, user_name, birthday)
VALUES ('jenny', '1234', '장지원', '1995-10-27')
"""
event.listen(UserTable.__table__, 'after_create', DDL(init_insert_sql))
# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
# Base.metadata.drop_all(engine, [Base.metadata.tables['element']])
# Base.metadata.create_all(engine, [Base.metadata.tables['element']])
# Base.metadata.drop_all(engine, [Base.metadata.tables['word_example']])
# Base.metadata.create_all(engine, [Base.metadata.tables['word_example']])

def get_server():
    server = FastAPI(
        title="h-api",
        docs_url="/docs",
        redoc_url=None
    )
    server.include_router(router_user)
    server.include_router(router_han)
    server.include_router(router_ini)
    
    return server

app = get_server()