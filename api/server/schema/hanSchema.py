from pydantic import BaseModel
from typing import Optional, List
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


class HanInfo(BaseModel):
    id: int
    hanja: str
    kor: str
    radical: str
    radical_name: str
    level: str

    class Config:
        from_attributes = True


class ExampleInfo(BaseModel):
    word: str
    kor: str
    url: str

    class Config:
        from_attributes = True


class ElementHanInfo(BaseModel):
    partial_hanja: str
    partial_kor: str

    class Config:
        from_attributes = True


class SimilarHanInfo(BaseModel):
    id: int
    hanja: str
    kor: str
    partial_hanja: str
    partial_kor: str

    class Config:
        from_attributes = True


class HanDetailOut(BaseModel):
    h_info: HanInfo
    example_info: List[ExampleInfo]
    element_info: List[ElementHanInfo]
    similar_word_info: List[SimilarHanInfo]


class SimilarWordInfo(BaseModel):
    id: int
    hanja: str
    kor: str
    
    class Config:
        from_attributes = True
    

class SimilarWordOut(BaseModel):
    row: List[SimilarWordInfo]
    
    class Config:
        from_attributes = True
    