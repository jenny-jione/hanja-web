
export const catchErrorHandler = error => {
    if (error === 'serverError') return alert('잠시 후 다시 시도해 주세요.');
    else if (error === 'wrongId')
      return alert('아이디 또는 비밀번호가 틀렸습니다.\n다시 입력해 주세요.');
    else if (error === 'wrongPw')
      return alert('비밀번호가 틀렸습니다.\n다시 입력해 주세요.'); 
  };



export const convertLevel = (lv) => {
  if (lv){
    const num = lv[0];
    const jun = lv[1]; // 준 ox
    if (jun == '0'){
        return num+'급';
    } else {
        return '준'+num+'급';
    }
  };
  }