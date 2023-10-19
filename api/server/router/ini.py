from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from server.database import get_db
from server.crud import iniCrud

router_ini = APIRouter(
    prefix='/ini',
    tags=['initiate data']
)

@router_ini.post('')
def initiate(
    db: Session = Depends(get_db)
):
    iniCrud.initiate_data(db)


@router_ini.post('/element')
def initiate_element(
    db: Session = Depends(get_db)
):
    iniCrud.initiate_data_element(db)
