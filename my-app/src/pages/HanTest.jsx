import { useEffect, useState } from "react";
import { getTest, examineInput } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from '../component/Background';
import TemplateBlock from "../component/Template";
import BasicButton from "./BasicButton";
import HanjaDiv from "../component/TemplateHanjaDiv";
import CenterDiv from "../component/TemplateBodyDiv";



import CommonNavbar from "../component/RBSNav";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';


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
    const handleSubmit = (e) => {
        e.preventDefault();        
        postCheck();
        setEnterCount((cnt) => cnt + 1);
        if (enterCount > 0) {
            changePage('next_id');
            setInputText('');
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
        <CommonNavbar></CommonNavbar>

        <Container>
            <Row>
                <div className="text-center">
                    <h1>{data?.h_info?.hanja}</h1>
                </div>
            </Row>
            <Row>
                {
                    !isEntered &&
                    <>
                    <Row><br></br></Row>
                    <Row><br></br></Row>
                    <Row><br></br></Row>
                    <Row><br></br></Row>
                    </>
                }
            </Row>
            <Row className="text-center">
                { 
                    isEntered &&
                    <div>
                        <div>
                            {inputResult}
                        </div>
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
            </Row>

            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    type="text" 
                    placeholder="" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
            </Form>

           
        </Container>
        
        </>
    )

}

export default HanTest;