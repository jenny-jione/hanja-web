// 입력 없이 yes, no로 체크하는 페이지.
import { useEffect, useState } from "react";
import { getCheck, updateCheck } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import ReactHotKey from 'react-shortcut';
import styled from "styled-components";
import GlobalStyle from '../component/Background';
import TemplateBlock from "../component/Template";


// pink: background: #f06595;
// const BasicButton = styled.button`
//   /* 공통 스타일 */
//   display: inline-flex;
//   outline: none;
//   border: none;
//   border-radius: 4px;
//   color: white;
//   font-weight: bold;
//   cursor: pointer;
//   padding-left: 1rem;
//   padding-right: 1rem;

//   /* 크기 */
//   height: 30px;
//   font-size: 1rem;


//   /* 기타 */
//   & + & {
//     margin-left: 1rem;
//   }
// `;
const BasicButton = styled.button`
  border: none;
  height: 30px;
  font-size: 15px;
  color: black;
  background-color: lightgray;
`;

const HanjaDiv = styled.div`
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  h1 {
    text-align: center;
    margin: 0 auto;
    font-size: 32px;
    color: #343a40;
  }
`;


const CenterDiv = styled.div`
  margin: auto;
`;

const ButtomButton = styled.button`
  position : absolute;
  border: none;
  bottom : 0;
  height: 30px;
  font-size: 15px;
`;
const ShowButton = styled(ButtomButton)`
  width: 100%;
  color: gray;
  background-color: lightgray;
`;

const YesButton = styled(ButtomButton)`
  left: 0;
  width: 50%;
  color: gray;
  background-color: lightgray;
`;
const NoButton = styled(ButtomButton)`
  right: 0;
  width: 50%;
  color: lightgray;
  background-color: gray;
`;


// const BottomDiv = styled.div`
//   position: absolute;
//   bottom: 0;
// `;
// const YesButton = styled.button`
//   width: 50%;
// `;
// const NoButton = styled.button`
//   flex-grow: 1;
// `;





const HanCheck = () => {
    const [isShowClicked, setIsShowClicked] = useState(false);
    const [isEventHandled, setIsEventHandled] = useState(false);
    const [data, setData] = useState({
        prev_id: null,
        h_info: {},
        next_id: null,
    });
    const { hid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '체크';
    });

    const getHanCheck = async () => {
        const result = await getCheck(hid);
        if (typeof result === 'object') {
            setData(result?.data);
            setIsShowClicked(false);
            setIsEventHandled(false);
        }
    }

    // 답 보여주는 함수
    const showAnswer = () => {
        setIsShowClicked(true);
    }

    // 체크 입력값(yes/no) 들어오면
    //  1. 백엔드로 POST 요청 보낸다 
    //  2. yes/no 버튼 숨긴다
    //  3. next_id로 이동
    const postCheck = check => {
        if (!isEventHandled && isShowClicked) {
            // 1
            const result = updateCheck(hid, check);
            console.log(check);
            // 2
            setIsEventHandled(true);
            // 3
            navigate(`/check/${data['next_id']}`)
        }
    }

    const toHomePage = () => {
        navigate('/list');
    }


    useEffect(() => {
        getHanCheck();
    }, [hid]);


    return (
        <>
        <GlobalStyle />
        <TemplateBlock>
            <BasicButton onClick={toHomePage}>Home</BasicButton>
            {/* <div>{data?.h_info?.id}</div> */}
            <HanjaDiv>
                <h1>{data?.h_info?.hanja}</h1>
            </HanjaDiv>
            <ReactHotKey keys='Enter' onKeysPressed={() => showAnswer()}></ReactHotKey>
            {
                !isShowClicked &&
                <ShowButton onClick={showAnswer}>show answer</ShowButton>
            }
            <CenterDiv>
                {
                    isShowClicked && 
                    <div>
                        <div>
                            {data?.h_info?.kor}
                        </div>
                        <div>
                            ({data?.h_info?.radical} : {data?.h_info?.radical_name})
                        </div>
                        <div>
                            {data?.h_info?.level}
                        </div>
                    </div>
                }
                {
                    isShowClicked && !isEventHandled &&
                    <div>
                        {/* <button onClick={() => postCheck(true)}>yes</button>
                        <button onClick={() => postCheck(false)}>no</button> */}
                        <YesButton onClick={() => postCheck(true)}>yes</YesButton>
                        <NoButton onClick={() => postCheck(false)}>no</NoButton>
                    </div>
                }
            </CenterDiv>
            
            <ReactHotKey keys='1' onKeysPressed={() => postCheck(true)}></ReactHotKey>
            <ReactHotKey keys='2' onKeysPressed={() => postCheck(false)}></ReactHotKey>

        </TemplateBlock>
        </>
    )

}

export default HanCheck;