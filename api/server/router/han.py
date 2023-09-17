from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server.database import get_db
from server.router.user import get_current_user
from server.crud import hanCrud
from server.schema import hanSchema, baseSchema
from server.models import UserTable
from typing import List

router_han = APIRouter(
    prefix='/han',
    tags=['han api']
)


@router_han.get('/list', response_model=baseSchema.Response[List[hanSchema.HanListOut]])
def get_h_list(
    sort_key: hanSchema.SortOrder = None,
    filter: hanSchema.ListFilter = None,
    search: str = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: UserTable = Depends(get_current_user)
):  
    current_user_id = current_user.user_id
    offset = (page - 1) * limit
    limit = 1817
    total_count, result = hanCrud.get_han_list(db=db, 
                                               search=search,
                                               filter='',
                                               sort_key=sort_key, 
                                               limit=limit, 
                                               offset=offset,
                                               current_user_id=current_user_id)
    total_page = total_count // limit
    if total_count % limit != 0:
        total_page += 1
    return baseSchema.Response().metadata(
        totalCount=total_count,
        page=page,
        totalPage=total_page,
        offset=offset,
        limit=limit
    ).successfulResponse(result)



@router_han.get('/detail/{h_id}')
def get_h_info(
    h_id: int,
    search: str = None,
    # filter: str,
    db: Session = Depends(get_db)
):
    h_info = hanCrud.get_han_info_with_prev_next(db=db, filter='a', h_id=h_id)
    result = {
        'h_info': h_info,
    }
    return result


@router_han.get('/shuffle/{h_id}')
def get_h_info_shuffle(
    h_id: int,
    review: bool = False,
    db: Session = Depends(get_db),
    current_user: UserTable = Depends(get_current_user)
):
    h_info = hanCrud.get_han_info(db=db, h_id=h_id)

    if review:
        current_user_id = current_user.user_id
        next_id = hanCrud.get_next_random_info(db=db, current_user_id=current_user_id)
    else:
        import random
        next_id = random.randint(1, 1817)

    result = {
        'h_info': h_info,
        'next_id': next_id
    }
    return result


@router_han.post('/test/{h_id}')
def examine_user_input(
    h_id: int,
    user_input: str = 't',
    db: Session = Depends(get_db),
    current_user: UserTable = Depends(get_current_user)
):
    current_user_id = current_user.user_id
    result = hanCrud.examine_input(db, 
                          h_id=h_id, 
                          user_input=user_input,
                          user_id=current_user_id
                          )
    return result


@router_han.post('/check/{h_id}')
def check_update(
    h_id: int,
    check: bool,
    db: Session = Depends(get_db),
    current_user: UserTable = Depends(get_current_user)
):
    current_user_id = current_user.user_id
    result = hanCrud.update_check(db, 
                          h_id=h_id, 
                          check=check,
                          user_id=current_user_id
                          )
    return result
