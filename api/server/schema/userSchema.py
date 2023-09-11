from pydantic import BaseModel, validator, Field
from datetime import date


class UserCreate(BaseModel):
    user_id: str = Field(examples=["babo"])
    password1: str = Field(examples=["1234"])
    password2: str = Field(examples=["1234"])
    name: str = Field(examples=["홍길동"])
    birthday: date = Field(examples=["2000-01-01"])

    @validator('user_id', 'password1', 'password2', 'name')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다.')
        return v

    @validator('password2')
    def passwords_match(cls, v, values):
        if 'password1' in values and v != values['password1']:
            raise ValueError('비밀번호가 일치하지 않습니다')
        return v


class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str