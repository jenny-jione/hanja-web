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
import { convertLevel } from "../js/common";


const HanCheck = (props) => {
    const [isShowClicked, setIsShowClicked] = useState(false);
    const [isEventHandled, setIsEventHandled] = useState(false);
    const [data, setData] = useState({
        h_info: {},
        next_id: null,
    });
    const { hid } = useParams();
    const review = props.reviewProp;
    const navigate = useNavigate();

    const [title, setTitle] = useState('title');
    useEffect(() => {
        review ? setTitle('recheck') : setTitle('check');
        document.title = title;
    });

    const getHanCheck = async () => {
        const result = await getCheck(hid, review);
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
            // 0 
            if (data?.next_id == null){
                alert("복습할 단어가 없습니다. 홈으로 돌아갑니다.");
                return navigate('/home');
            }
            // 3
            if (review==true) {
                navigate(`/review/${data['next_id']}`);
            } else {
                navigate(`/check/${data['next_id']}`);
            }
            // navigate(`/check/${data['next_id']}`)
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

        <Container>
            <Row>
                <div className="text-center">
                    {/* <h1 style={{fontSize:100}}>{data?.h_info?.hanja}</h1> */}
                    <h1 style={{fontSize:80}}>{data?.h_info?.hanja}</h1>
                </div>
            </Row>
            <Row>
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
                {/* <Row style={{fontSize:60}} className="text-center"> */}
                <Row className="text-center">
                    <div>
                        {data?.h_info?.kor}
                    </div>
                    <div>
                        {data?.h_info?.radical} : {data?.h_info?.radical_name}
                    </div>
                    <div>
                        {convertLevel(data?.h_info?.level)}
                    </div>    
                </Row>
                </>
            }
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Row>
                {
                    !isShowClicked &&
                    <Button onClick={showAnswer} variant="light" size="lg">
                        훈 음 보기
                    </Button>
                }
                {
                    isShowClicked && !isEventHandled &&
                    <>
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={() => postCheck(true)} variant="light">안다</Button>
                        <Button onClick={() => postCheck(false)} variant="secondary">모른다</Button>
                    </ButtonGroup>
                    </>
                }
            </Row>
        </Container>
        </>
    )

}

export default HanCheck;