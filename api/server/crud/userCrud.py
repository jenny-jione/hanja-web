from server.models import UserTable
from sqlalchemy.orm import Session
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(db: Session, user_id: str):
    return db.query(UserTable).filter(UserTable.user_id==user_id).first()