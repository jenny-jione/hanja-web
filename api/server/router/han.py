from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from server.database import get_db
from server.crud import hanCrud
from server.schema import hanSchema
from typing import List

router_han = APIRouter(
    prefix='/han',
    tags=['han api']
)


@router_han.get('/list', response_model=List[hanSchema.HanListOut])
def get_h_list(
    # sort_key: hanSchema.SortOrder,
    limit: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db)
):  
    sort_key = 'ganada'
    result = hanCrud.get_han_list(db=db, sort_key=sort_key, limit=limit, offset=offset)
    return result


@router_han.get('/detail/{h_id}')
def get_h_info(
    h_id: int,
    db: Session = Depends(get_db)
):
    # 이전 다음 id는 임의로 랜덤으로 ..
    h_info = hanCrud.get_han_info(db=db, h_id=h_id)
    import random
    prev_id = random.randint(1, 1817)
    next_id = random.randint(1, 1817)
    result = {
        'prev_id': prev_id,
        'h_info': h_info,
        'next_id': next_id
    }
    return result


@router_han.post('/test/{h_id}')
def examine_user_input(
    h_id: int,
    user_input: str = 't',
    db: Session = Depends(get_db)
    # user_id: int
):
    # user 정보도 가져와야 하냉 . . . 
    user_id = 1
    result = hanCrud.examine_input(db, 
                          h_id=h_id, 
                          user_input=user_input,
                          user_id=user_id
                          )
    return result


@router_han.post('/check/{h_id}')
def check_update(
    h_id: int,
    check: bool,
    db: Session = Depends(get_db)
    # user_id: int
):
    # user 정보도 가져와야 하냉 . . . 
    user_id = 1
    result = hanCrud.update_check(db, 
                          h_id=h_id, 
                          check=check,
                          user_id=user_id
                          )
    return result
