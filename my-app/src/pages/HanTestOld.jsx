import { useEffect, useState } from "react";
import { getTest, examineInput } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from '../component/Background';
import TemplateBlock from "../component/Template";
import BasicButton from "./BasicButton";
import HanjaDiv from "../component/TemplateHanjaDiv";
import CenterDiv from "../component/TemplateBodyDiv";

const BottomCenterDiv = styled.div`
    text-align: center;
`;

const InputBox = styled.input`
	width: 70%;
    height: 30px;
	border: 1px solid #91D0D2;
	border-radius: 16px;
    bottom: 0;
    text-align: center;
	outline: none;
`;

// 시험
const HanTest = () => {
    const [data, setData] = useState({
        prev_id: null,
        h_info: {},
        next_id: null,
    });
    const [inputText, setInputText] = useState('');
    const [isEntered, setIsEntered] = useState(false);
    const [enterCount, setEnterCount] = useState(0);
    const [inputResult, setInputResult] = useState('');
    const { hid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '테스트';
    });

    const getHanTest = async () => {
        const result = await getTest(hid);
        if (typeof result === 'object') {
            setData(result?.data)
            setInputText('');
            setIsEntered(false);
            setEnterCount(0);
        }
    }
    
    // 엔터키 감지
    const activeEnter = (e) => {
        if(e.key === "Enter") {
            postCheck();
            setEnterCount((cnt) => cnt + 1);
            console.log(`${inputText} 입력 완료 :: ${enterCount}`);
            if (enterCount > 0) {
                changePage('next_id');
                setInputText('');
            }
        }
      }

    // input 입력값 들어오면
    //  0. 답 보여줌
    //  1. 백엔드로 POST 요청 보냄
    const postCheck = async () => {
        // 엔터키 처음쳤을때만 post요청 보내야 함.
        if (!isEntered) {
            setIsEntered(true);
            const result = await examineInput(hid, inputText);
            if (result) {
                setInputResult('right! :D');
            } else {
                setInputResult('wrong :(');
            }
        }
    }

    const changePage = direction => {
        navigate(`/test/${data[direction]}`)
    }

    const toHomePage = () => {
        navigate('/');
    }


    useEffect(() => {
        getHanTest();
    }, [hid]);


    return (
        <>
        <GlobalStyle />
        <TemplateBlock>
            <BasicButton onClick={toHomePage}>Home</BasicButton>
            <HanjaDiv>
                <h1>{data?.h_info?.hanja}</h1>
                {/* <h1>h1</h1> */}
            </HanjaDiv>
            <CenterDiv>
                { 
                    isEntered &&
                    <div>
                        <div>
                            {inputResult}
                        </div>
                        <div>
                            {data?.h_info?.kor}
                        </div>
                        {/* <div>
                            ({data?.h_info?.radical} : {data?.h_info?.radical_name})
                        </div>
                        <div>
                            {data?.h_info?.level}
                        </div> */}
                    </div>
                }
            </CenterDiv>
            
            <BottomCenterDiv>
                <InputBox 
                    type='text'
                    placeholder="입력"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => activeEnter(e)}
                    ></InputBox>
            </BottomCenterDiv>
        </TemplateBlock>
        </>
    )

}

export default HanTest;