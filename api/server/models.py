from .database import Base
from sqlalchemy import Column, BigInteger, String, Date

class UserTable(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(String(255), unique=True, index=True)
    password = Column(String(255), nullable=False)
    user_name = Column(String(255), nullable=False)
    birthday = Column(Date, nullable=True)  # 생년월일