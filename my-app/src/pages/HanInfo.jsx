import { useEffect, useState } from "react";
import { getDetail } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import CommonNavbar from "../component/RBSNav";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { convertLevel } from "../js/common";


// 상세정보
const HanInfo = () => {
    const [data, setData] = useState({
        prev_id: null,
        h_info: {},
        element_info: [],
        similar_word_info: [],
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


    // element 테이블 렌더 함수
    const renderElementTableFn = () => {
        return data?.element_info.map(({ partial_hanja, partial_kor }, index) => (
            <tr>
                <td>{partial_hanja}</td>
                <td>{partial_kor}</td>
            </tr>
        ));
    };

    // 유사한자 테이블 렌더 함수
    const renderSimilarTableFn = () => {
        const handleRowClick = (id) => {
            navigate(`/detail/${id}`)
        }
        return data?.similar_word_info.map(({ id, hanja, kor, partial_hanja, partial_kor }, index) => (
            <tr key={id} onClick={() => handleRowClick(id)}>
                {/* <td>{index+1}dd</td> */}
                <td>{hanja}</td>
                <td>{kor}</td>
                <td>{partial_hanja}</td>
                <td>{partial_kor}</td>
            </tr>
        ));
    };


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
                <div>

                </div>    
            </Row>
            </>
            <br/>
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

        <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>모양자</th>
                <th>훈 음</th>
            </tr>
            </thead>
            <tbody>{renderElementTableFn()}</tbody>
        </Table>

        <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>비슷한 한자</th>
                <th>훈 음</th>
            </tr>
            </thead>
            <tbody>{renderSimilarTableFn()}</tbody>
        </Table>
        </>
        
    )

}

export default HanInfo;