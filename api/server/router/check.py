from fastapi import APIRouter

router_check = APIRouter(
    prefix='/check',
    tags=['Check api']
)

@router_check.post('/{h_id}')
def check_input(
    h_id: int,
    user_input: str,
    # user_id: int
):
    print(user_input)