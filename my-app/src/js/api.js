import axios from 'axios';


// = 에러 핸들링
const catchError = async error => {
    const { status } = error?.response;
    const { detail } = error?.response?.data;
    switch (status) {
      case 401:
        if (detail === 'Incorrect username or password')
          return alert('아이디 또는 비밀번호가 틀렸습니다.\n다시 입력해 주세요.');
        break;
      case 500:
      case 504:
        return 'serverError';
      default:
        return;
    }
  };


// 리스트 불러오기
export const getList = async (
    { page, limit },
) => {
    try {
        return await axios.get(
            `/han/list?offset=${page}&limit=${limit}`
        );
    } catch (error) {
        return catchError(error);
    }
};


// 상세 불러오기
export const getDetail = async (
    hid
) => {
    try {
        return await axios.get(
            `/han/detail/${hid}`
        );
    } catch (error) {
        return catchError(error)
    }
};


// 테스트 화면
export const getTest = async(
    hid
) => {
    try {
        return await axios.get(
            `/han/detail/${hid}`
        );
    } catch (error) {
        return catchError(error)
    }
};


// 체크 화면
export const getCheck = async(
    hid
) => {
    try {
        return await axios.get(
            `/han/detail/${hid}`
        );
    } catch (error) {
        return catchError(error)
    }
};


// 사용자 yes/no 결과 업데이트
export const updateCheck = async(hid, check) => {
    try {
        return await axios.post(`/han/check/${hid}?check=${check}`)
    } catch (error) {
        return catchError(error)
    }
};