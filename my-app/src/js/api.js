import axios from 'axios';
import { getCookie } from './cookie';


// = 에러 핸들링
const catchError = async error => {
    const { status } = error?.response;
    const { detail } = error?.response?.data;
    switch (status) {
      case 401:
        if (detail == 'Not authenticated'){
          return alert('토큰값이 없습니다.');
        }
        else if (detail == 'Incorrect id or password') {
          return alert('아이디 또는 비밀번호가 틀렸습니다.\n다시 입력해 주세요.');
        }
        break;
      case 500:
      case 504:
        return 'serverError';
      default:
        return;
    }
  };


export const signIn = async (id, pw) => {
    try {
        return await axios.post(
            `/user/login`,
            `grant_type=&username=${id}&password=${pw}&scope=&client_id=&client_secret=`,
            { 'Content-Type': 'application/x-www-form-urlencoded' }
        );
    } catch (error) {
        return catchError(error);
    }
};


const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('myToken')}`,
};


// 리스트 불러오기
export const getList = async (
    { page, limit },
    searchText,
    sortOrder
) => {
    try {
        return await axios.get(
            `/han/list?page=${page}&limit=${limit}&search=${searchText}&sort_key=${sortOrder}`,
            { headers }
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
            `/han/shuffle/${hid}`
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
            `/han/shuffle/${hid}`
        );
    } catch (error) {
        return catchError(error)
    }
};


// 체크 - 사용자 yes/no 결과 업데이트
export const updateCheck = async(hid, check) => {
    try {
        return await axios.post(
            `/han/check/${hid}?check=${check}`, 
            null,
            { headers }
        );
    } catch (error) {
        return catchError(error)
    }
};


// 테스트 - 사용자 입력 examine해서 정오 결과 리턴받음
export const examineInput = async(hid, input) => {
    try {
        const response = await axios.post(
            `/han/test/${hid}?user_input=${input}`,
            null,
            { headers }
            )
        return response.data;
    } catch (error) {
        return catchError(error)
    }
}


// Recheck 화면
export const getRecheck = async(
    hid
) => {
    try {
        return await axios.get(
            `/han/review/${hid}`,
            { headers }
        );
    } catch (error) {
        return catchError(error)
    }
};