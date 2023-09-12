from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta, datetime
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from starlette import status
from server.database import get_db
from server.crud import userCrud
from server.schema import userSchema


ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
SECRET_KEY = "4ab2fce7a6bd79e1c014396315ed322dd6edb1c5d975c6b74a2904135172c03c"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

router_user = APIRouter(
    prefix='/user',
    tags=['User api']
)

@router_user.post('/signup', status_code=status.HTTP_204_NO_CONTENT)
def user_create(
    _user_create: userSchema.UserCreate,
    db: Session = Depends(get_db)
):
    userCrud.create_user(db=db, user_create=_user_create)


@router_user.post('/login', response_model=userSchema.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                           db: Session = Depends(get_db)):
    user = userCrud.get_user(db=db, user_id=form_data.username)
    # if not user or not userCrud.pwd_context.verify(form_data.password, user.password):
    if not user or (form_data.password != user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect id or password",
            headers={"WWW-Authenticated": "Bearer"}
        )
    
    # make access token
    data = {
        "sub": user.user_id,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    access_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.user_id
    }


def get_current_user(token: str = Depends(oauth2_scheme),
                     db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    else:
        user = userCrud.get_user(db, user_id=username)
        if user is None:
            raise credentials_exception
        return user