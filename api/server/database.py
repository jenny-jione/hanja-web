from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

import os

db = {
    "user":os.environ['MYSQL_USER'],
    "password":os.environ['MYSQL_PASSWORD'],
    "host":os.environ['DB_HOST'],
    # "port":os.environ['DB_PORT'],
    "port": 3306,
    "database":os.environ['MYSQL_DATABASE']
}

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_size=20, max_overflow=40, pool_recycle=30, pool_pre_ping=True)
Base = declarative_base()

def get_db():
    SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=True, bind=engine))
    session = SessionLocal()
    try:
        yield session
        session.commit()
        print('- db commit -')
    except:
        session.rollback() 
    finally:
        session.close()
