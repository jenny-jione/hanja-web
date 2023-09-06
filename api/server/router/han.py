from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from server.database import get_db
from server.crud import hanCrud

router_han = APIRouter(
    prefix='/han',
    tags=['han api']
)


@router_han.get('')
def get_h_list(
    limit: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    print(limit, offset)
    
    import random
    offset = random.randint(0, 1807)
    
    result = hanCrud.get_han_list(db=db, limit=limit, offset=offset)
    return result


@router_han.get('/{h_id}')
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
        'info': h_info,
        'next_id': next_id
    }
    return result


@router_han.post('/{h_id}')
def check_user_input(
    h_id: int,
    user_input: str = 't',
    db: Session = Depends(get_db)
    # user_id: int
):
    # user 정보도 가져와야 하냉 . . . 
    user_id = 1
    print(user_input)
    result = hanCrud.check_input(db, 
                          h_id=h_id, 
                          user_input=user_input,
                          user_id=user_id
                          )
    return result
