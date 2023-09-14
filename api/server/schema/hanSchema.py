from pydantic import BaseModel
from typing import Optional
from enum import Enum


class SortOrder(str, Enum):
    ganada = 'ganada'
    count_asc = 'count_asc'
    count_desc = 'count_desc'
    level_asc = 'level_asc'
    level_desc = 'level_desc'
    stroke_asc = 'stroke_asc'
    stroke_desc = 'stroke_desc'


class ListFilter(str, Enum):
    all = 'all'
    level2 = 'level2'
    level3 = 'level3'
    # TODO 부수별로 filter


class HanListOut(BaseModel):
    id: int
    hanja: str
    kor: str
    radical: str
    radical_name: str
    level: str
    count: Optional[int]
    stroke_count: int

    class Config:
        from_attributes = True