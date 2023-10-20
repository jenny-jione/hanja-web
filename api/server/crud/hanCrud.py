from server.models import HanTable, GradeTable, ElementTable
from sqlalchemy.orm import Session
from enum import Enum
from sqlalchemy import func


def get_han_list(db: Session,
                 search: str,
                 filter: Enum,
                 sort_key: Enum,
                 limit: int, 
                 offset: int,
                 current_user_id: str
                 ):
    grade_sub_q = db.query(GradeTable).filter(GradeTable.user_id==current_user_id).subquery()

    han_list = db.query(
        HanTable.id,
        HanTable.hanja,
        HanTable.kor,
        HanTable.radical,
        HanTable.radical_name,
        HanTable.level,
        HanTable.stroke_count,
        func.coalesce(grade_sub_q.c.count, 0).label('count')
        ).outerjoin(
            grade_sub_q,
            grade_sub_q.c.hanja==HanTable.hanja
        )
    if filter:
        han_list = han_list.filter(HanTable.level)
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
    elif sort_key == 'level_asc':
        han_list = han_list.order_by(
            HanTable.level.asc()
        )
    elif sort_key == 'level_desc':
        han_list = han_list.order_by(
            HanTable.level.desc()
        )
    elif sort_key == 'stroke_asc':
        han_list = han_list.order_by(
            HanTable.stroke_count.asc(),
            HanTable.level.desc()
        )
    elif sort_key == 'stroke_desc':
        han_list = han_list.order_by(
            HanTable.stroke_count.desc(),
            HanTable.level.asc()
        )

    han_list = han_list.order_by(
        HanTable.id.asc()
        ).offset(offset).limit(limit).all()
    return total_count, han_list


def get_han_info_with_prev_next(db: Session, filter: str, h_id: int):
    han_info = db.query(HanTable).filter(HanTable.id == h_id).first()
    
    element_han = db.query(
        ElementTable.partial_hanja  # 1
        # ElementTable.partial_kor  # 2
        ).select_from(
            HanTable
        ).filter(
            HanTable.id == h_id
        ).join(
            ElementTable,
            ElementTable.hanja==HanTable.hanja)#.subquery()

    element_kor = db.query(
        # ElementTable.partial_hanja  # 1
        ElementTable.partial_kor  # 2
        ).select_from(
            HanTable
        ).filter(
            HanTable.id == h_id
        ).join(
            ElementTable,
            ElementTable.hanja==HanTable.hanja)#.subquery()


    element_list = db.query(
        ElementTable.hanja,
        ElementTable.partial_hanja,
        ElementTable.partial_kor
    ).select_from(
        HanTable
    ).join(
        ElementTable,
        HanTable.hanja==ElementTable.hanja
        ).filter(HanTable.id==h_id).all()
    
    similar_list = db.query(
        HanTable.id,
        HanTable.hanja,
        HanTable.kor,
        HanTable.stroke_count,
        ElementTable.partial_hanja,
        ElementTable.partial_kor
        ).filter(
            ElementTable.partial_hanja.in_(element_han),  # 1
            ElementTable.partial_kor.in_(element_kor),  # 2
            ElementTable.partial_kor != '-',
            ElementTable.hanja != element_list[0].hanja  # to exclude itself
        ).outerjoin(
            ElementTable,
            ElementTable.hanja==HanTable.hanja
        ).order_by(
            # ElementTable.partial_hanja
            ElementTable.partial_kor,
            HanTable.stroke_count
        ).all()
    
    if not han_info:
        return False
    # return han_info

    result = {
        'h_info': han_info,
        'element_info': element_list,
        'similar_word_info': similar_list
    }
    return result


def get_han_info(db: Session, h_id: int):
    han_info = db.query(HanTable).filter(HanTable.id == h_id).first()
    if not han_info:
        return False
    return han_info

def get_next_random_info(db: Session, current_user_id: str):
    grade_sub_q = db.query(GradeTable).filter(GradeTable.user_id==current_user_id).subquery()
    
    next_info = db.query(
        HanTable.id
    ).outerjoin(
        grade_sub_q,
        grade_sub_q.c.hanja==HanTable.hanja
    ).filter(
        grade_sub_q.c.count > 0
    ).order_by(
        func.random()
    ).first()
    
    if not next_info:
        return None
    next_id = next_info.id
    
    return next_id

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


def update_grade(db: Session, hanja: str, check_result: bool, user_id: int):
    grade_base_q = db.query(GradeTable).filter(GradeTable.hanja==hanja,
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
                hanja=hanja,
                count=1,
                user_id=user_id
            )
            db.add(record)


def examine_input(db: Session, h_id: int, user_input: str, user_id: int):
    print('h_id:', h_id)
    h_info = db.query(HanTable).filter(HanTable.id==h_id).first()
    answer = h_info.kor
    hanja = h_info.hanja
    check_result = check_response(answer=answer, user_response=user_input)
    
    update_grade(db=db, hanja=hanja, check_result=check_result, user_id=user_id)

    return check_result


def update_check(db: Session, h_id: int, check: bool, user_id: int):
    h_info = db.query(HanTable.hanja).filter(HanTable.id==h_id).first()
    hanja = h_info.hanja
    update_grade(db=db, hanja=hanja, check_result=check, user_id=user_id)            
    return check