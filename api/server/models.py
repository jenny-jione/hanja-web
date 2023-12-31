from .database import Base
from sqlalchemy import Column, BigInteger, String, VARCHAR, Date, Integer

class UserTable(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(String(255), unique=True, index=True)
    password = Column(String(255), nullable=False)
    user_name = Column(String(255), nullable=False)
    birthday = Column(Date, nullable=True)


class HanTable(Base):
    __tablename__ = "han"
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    hanja = Column(VARCHAR(10), unique=True, index=True)
    kor = Column(VARCHAR(30), nullable=False)
    radical = Column(VARCHAR(10), nullable=False)
    radical_name = Column(VARCHAR(30), nullable=False)
    stroke_count = Column(Integer, nullable=False)
    level = Column(VARCHAR(10), nullable=False)
    rep_pron = Column(VARCHAR(10), nullable=False)

# hanja, kor, radical, radical_name, stroke_count, level, rep_pron


class GradeTable(Base):
    __tablename__ = "grade"
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    hanja = Column(VARCHAR(10), unique=True, index=True)
    count = Column(BigInteger, nullable=False)
    user_id = Column(String(255), nullable=False)
    

class ElementTable(Base):
    __tablename__ = "element"
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    hanja = Column(VARCHAR(10), nullable=False, index=True)
    partial_hanja = Column(VARCHAR(10), nullable=False)
    partial_kor = Column(VARCHAR(30), nullable=False)


class WordExampleTable(Base):
    __tablename__ = "word_example"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    hanja = Column(VARCHAR(10), nullable=False)
    word = Column(VARCHAR(30), nullable=False)
    kor = Column(VARCHAR(30), nullable=False)
    url = Column(VARCHAR(100), nullable=False)
