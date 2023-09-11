from pydantic import BaseModel
from typing import Optional
from enum import Enum


class SortOrder(str, Enum):
    ganada = 'ganada'
    count_asc = 'count_asc'
    count_desc = 'count_desc'


class HanListOut(BaseModel):
    id: int
    hanja: str
    kor: str
    radical: str
    radical_name: str
    level: str
    count: Optional[int]

    class Config:
        from_attributes = True