import { useEffect, useState } from "react";
import { getDetail } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import CommonNavbar from "../component/RBSNav";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { convertLevel } from "../js/common";


// 상세정보
const HanInfo = () => {
    const [data, setData] = useState({
        prev_id: null,
        h_info: {},
        next_id: null,
    });
    const { hid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '상세';
    });

    const getHanDetail = async () => {
        const result = await getDetail(hid);
        if (typeof result === 'object') {
            setData(result?.data)
        }
    }

    const changePage = direction => {
        navigate(`/detail/${data[direction]}`)
    }

    const toHomePage = () => {
        navigate('/list');
    }





    useEffect(() => {
        getHanDetail();
    }, [hid]);


    return (

        <>
        <CommonNavbar></CommonNavbar>
        <Container>
            <Row>
                <div className="text-center">
                    <h1 style={{fontSize:80}}>{data?.h_info?.hanja}</h1>
                </div>
            </Row>
            <Row>
            </Row>
            
            <>
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
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Row>
                {/* {
                    <>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="light">prev</Button>
                        <Button variant="secondary">next</Button>
                    </ButtonGroup>
                    </>
                } */}
            </Row>
        </Container>
        </>
        
    )

}

export default HanInfo;