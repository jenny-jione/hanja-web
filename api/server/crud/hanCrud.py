from server.models import HanTable, GradeTable
from sqlalchemy.orm import Session
from enum import Enum
from sqlalchemy import func


def get_han_list(db: Session,
                 search: str,
                 sort_key: Enum, 
                 limit: int, 
                 offset: int):
    current_user_id = 1 # TODO: 로그인 기능 구현되면 로그인 정보 받아와서 해당하는 user_id로 가져와야 함
    grade_sub_q = db.query(GradeTable).filter(GradeTable.user_id==current_user_id).subquery()

    han_list = db.query(
        HanTable.id,
        HanTable.hanja,
        HanTable.kor,
        HanTable.radical,
        HanTable.radical_name,
        HanTable.level,
        func.coalesce(grade_sub_q.c.count, 0).label('count')
        ).outerjoin(
            grade_sub_q,
            grade_sub_q.c.h_id==HanTable.id
        )
    if search:
        han_list = han_list.filter(HanTable.kor.like(f'%{search}%'))
    
    total_count = han_list.count()
    print(total_count)
    if sort_key == 'count_asc':
        han_list = han_list.order_by(
            grade_sub_q.c.count.asc()
        )
    elif sort_key == 'count_desc':
        han_list = han_list.order_by(
            grade_sub_q.c.count.desc()
        )
    han_list = han_list.order_by(
        HanTable.id.asc()
        ).offset(offset).limit(limit).all()
    return han_list


def get_han_info_with_prev_next(db: Session, filter: str, h_id: int):
    han_info = db.query(HanTable).filter(HanTable.id == h_id).first()
    if not han_info:
        return False
    return han_info


def get_han_info(db: Session, h_id: int):
    han_info = db.query(HanTable).filter(HanTable.id == h_id).first()
    if not han_info:
        return False
    return han_info

# 입력값 판단
# answer: db에 저장된 정답, user_response: 사용자가 입력한 답안
def check_response(answer, user_response):
    # Empty value
    if not user_response:
        return False
    
    # 100% 일치
    if user_response == answer:
        return True

    user_response_splited = user_response.split('|')
    answer_splited = answer.split('|')
    
    # | split 후 개수가 다를 경우 바로 False 반환
    if len(answer_splited) != len(user_response_splited):
        return False
    
    # 정렬 후 일치
    if sorted(user_response_splited) == sorted(answer_splited):
        return True
    
    check = False
    for ans, resp in zip(answer_splited, user_response_splited):
        check = check_one(ans=ans, res=resp)
        if not check:
            return False
    return True


def check_one(ans, res):

    # 완전 일치
    if ans == res:
        return True
    
    res_split = res.split()
    # mean+' '+pron 형식이 아닐 경우 바로 False 반환
    if (' ' not in res) or (len(res_split)!=2):
        # print(f'not valid input :: {res}, {res_split}')
        return False

    # mean, pron split
    ans_h, ans_m = ans.split()
    res_h, res_m = res.split()

    # pron이 틀렸을 때 바로 False 반환
    if ans_m != res_m:
        return False
    
    # 순서 상관 없이 리스트 비교를 위해 / split 후 정렬
    ans_h_sorted = sorted(ans_h.split('/'))
    resp_h_sorted = sorted(res_h.split('/'))
    
    # ans: a/b c
    # res: b/a c
    if (ans_h_sorted == resp_h_sorted) and (ans_m == res_m):
        return True
    
    # ans: a/b c
    # res: (a c) or (b c)
    if len(resp_h_sorted) == 1:
        if (res_h in ans) and (res_m == ans_m):
            return True
        else:
            return False

    return False


def update_grade(db: Session, h_id: int, check_result: bool, user_id: int):
    grade_base_q = db.query(GradeTable).filter(GradeTable.h_id==h_id,
                                             GradeTable.user_id==user_id)
    grade_info = grade_base_q.first()
    
    # 코드 더 깔끔하게 고치는 방법 찾아보기 .. if문 너무 많음
    if grade_info:
        mistake = grade_info.count
        if check_result:
            mistake -= 1
            if mistake == 0:
                grade_base_q.delete()
            else:
                grade_base_q.update(values={GradeTable.count: mistake})
        else:
            mistake += 1
            grade_base_q.update(values={GradeTable.count: mistake})
    else:
        if not check_result:
            record = GradeTable(
                h_id=h_id,
                count=1,
                user_id=user_id
            )
            db.add(record)


def examine_input(db: Session, h_id: int, user_input: str, user_id: int):
    print('h_id:', h_id)
    h_info = db.query(HanTable).filter(HanTable.id==h_id).first()
    answer = h_info.kor
    check_result = check_response(answer=answer, user_response=user_input)
    
    update_grade(db=db, h_id=h_id, check_result=check_result, user_id=user_id)

    return check_result


def update_check(db: Session, h_id: int, check: bool, user_id: int):
    update_grade(db=db, h_id=h_id, check_result=check, user_id=user_id)            
    return check