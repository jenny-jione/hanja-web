import { useEffect, useState } from 'react';
import { getSimilarWords } from '../js/api';
import { useNavigate } from "react-router-dom";
import CommonNavbar from '../component/RBSNav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Table from 'react-bootstrap/Table';
import { convertLevel } from '../js/common';

const HanSimilar = () => {
    // const [data, setData] = useState({
    //     similar_word_info: {}
    // });

    const [list, setList] = useState([])


    const navigate = useNavigate();

    useEffect(() => {
        document.title = '비슷한 단어';
    });

    // 유사 단어 리스트
    const getHanSimilar = async () => {
        const result = await getSimilarWords();
        if (typeof result === 'object') {
            // setList(result?.data);
            console.log(result?.data);
        }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();        
    //     setSearchText(userInput);
    //     setPageInfo({
    //         page: 1,
    //         limit: 10,
    //     })
    // }


    // 테이블 렌더 함수
    const renderTableFn = () => {
        const handleRowClick = (id) => {
            navigate(`/detail/${id}`)
        }
        return list.map(({ id, hanja, kor }, index) => (
            <tr key={id} onClick={() => handleRowClick(id)}>
            {/* <tr> */}
                <td>{hanja}</td>
                <td>{kor}</td>
            </tr>
        ));
    };

    // useEffect(() => {
    //     getHanSimilar();
    // }, );

    getHanSimilar();

    return (
        <>
        <CommonNavbar/>

        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>한자</th>
                <th>훈음</th>
            </tr>
            </thead>
            <tbody>{renderTableFn()}</tbody>
        </Table>
        hi
        </>
    )
}

export default HanSimilar;