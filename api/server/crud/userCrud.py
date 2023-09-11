from server.models import UserTable
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from server.schema.userSchema import UserCreate


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(db: Session, user_create: UserCreate):
    db_user = UserTable(
        user_id=user_create.user_id,
        # password=pwd_context.hash(user_create.password1)
        password=user_create.password1,
        user_name=user_create.name,
        birthday=user_create.birthday
    )
    db.add(db_user)


def get_user(db: Session, user_id: str):
    return db.query(UserTable).filter(UserTable.user_id==user_id).first()