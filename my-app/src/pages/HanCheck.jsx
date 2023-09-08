// 입력 없이 yes, no로 체크하는 페이지.
import { useEffect, useState } from "react";
import { getCheck, updateCheck } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import ReactHotKey from 'react-shortcut';

import CommonNavbar from "../component/RBSNav";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


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

    useEffect(() => {
        getHanCheck();
    }, [hid]);


    return (
        <>
        <CommonNavbar></CommonNavbar>
        
        <ReactHotKey keys='Enter' onKeysPressed={() => showAnswer()}></ReactHotKey>
        <ReactHotKey keys='1' onKeysPressed={() => postCheck(true)}></ReactHotKey>
        <ReactHotKey keys='2' onKeysPressed={() => postCheck(false)}></ReactHotKey>

        <Container className="panel">
            <Row className="justify-content-xs-center">
                <Col xs="auto">
                    <h1>{data?.h_info?.hanja}</h1>
                </Col>
            </Row>
            
            {
                !isShowClicked &&
                <>
                <Row><br></br></Row>
                <Row><br></br></Row>
                <Row><br></br></Row>
                </>
            }
            {
                isShowClicked && 
                <>
                <Row>{data?.h_info?.kor}</Row>
                <Row>{data?.h_info?.radical} : {data?.h_info?.radical_name}</Row>
                <Row>{data?.h_info?.level}</Row>
                </>
            }
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Row>
                {
                    !isShowClicked &&
                    <Button onClick={showAnswer} variant="light" size="lg">
                        show answer
                    </Button>
                }
                {
                    isShowClicked && !isEventHandled &&
                    <>
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={() => postCheck(true)} variant="light">yes</Button>
                        <Button onClick={() => postCheck(false)} variant="secondary">no</Button>
                    </ButtonGroup>
                    </>
                }
            </Row>
        </Container>
        </>
    )

}

export default HanCheck;