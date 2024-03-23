# 한자 공부를 위한 웹사이트

3급 한자를 공부할 수 있는 웹사이트입니다.


<br/>

## 주요 기능
1. 전체 한자 목록 보기
2. 검색 (훈/음 부분검색 가능)
3. 상세페이지 (부수/단어/유의단어 확인)
4. 시험 (주관식/자가진단)
5. 오답 복습
6. 비슷한 한자 열람

<br/>

## 🎨 에디터

- Visual Studio Code
- TablePlus

<br/>

## 🖥 백엔드

### 언어 / 프레임워크

- python
- FastAPI

### 데이터베이스

- MySQL

### 인프라

- Docker

<br/>

## 💻 프론트엔드

### 언어 / 라이브러리

- React

<br/>
<br/>

# 화면
<img width="30%" alt="image" src="https://github.com/jenny-jione/hanja-web/assets/84297915/9ad15abe-9d34-4502-a12b-0625eab06c42">
<img width="30%" alt="image" src="https://github.com/jenny-jione/hanja-web/assets/84297915/b25c41fe-0f95-425b-8149-0ce265a65b3f">

<br/>
<img width="30%" alt="image" src="https://github.com/jenny-jione/hanja-web/assets/84297915/cf9372fc-069b-4004-8a10-786cfa03be00">
<img width="30%" alt="image" src="https://github.com/jenny-jione/hanja-web/assets/84297915/75be3d18-b374-4fa2-9c2c-5c3c5bd37fa8">

<br/>
<img width="30%" alt="image" src="https://github.com/jenny-jione/hanja-web/assets/84297915/1cf5941d-61bd-4a38-bbe2-4be13377ec18">
<img width="30%" alt="image" src="https://github.com/jenny-jione/hanja-web/assets/84297915/12f4c5e5-ae14-4c58-b03d-5d47aa4bede8">


<br/>
<br/>

## 🚧 TODO
2024
- (1/17) 쿠키 만료 후 재접속시 백에서는 에러를 반환하는데, 프론트에서는 에러 표시 없음. 그래서 화면에 데이터가 비어있는 오류 수정하기.
- ~~(1/22) 로그인 후 home으로 자동 리다이렉트 **간헐적으로** 안됨.~~ (1/23✔️: return을 제거했는데 일단은 간헐적으로 안되는 현상은 해결한 것 같음. 이유는 모르겠음.)
- (1/22) 급수별 시험 기능
- ~~(1/22) 시험(주관식) 페이지 진입시 form 태그에 autofocus 추가~~ (1/22✔️)
- ~~(1/24) Nav.Link 시험 href에 random 값 넣기~~ (1/24✔️)
- 한자어 오답 테이블 생성 (ex. 경치 -> 景致)