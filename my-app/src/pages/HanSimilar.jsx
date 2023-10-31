import { useEffect, useState } from 'react';
import { getSimilarWords } from '../js/api';
import { useNavigate } from "react-router-dom";
import CommonNavbar from '../component/RBSNav';
import Table from 'react-bootstrap/Table';


const HanSimilar = () => {
    const [list, setList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = '비슷한 단어';
    });

    // 유사 단어 리스트
    const getHanSimilar = async () => {
        const result = await getSimilarWords();
        if (typeof result === 'object') {
            setList(result?.data);
        }
    }

    // 테이블 렌더 함수
    const renderTableFn = () => {
        const handleRowClick = (id) => {
            navigate(`/detail/${id}`)
        }
        return list.map(({ id, hanja, kor }, index) => (
            <tr key={index} onClick={() => handleRowClick(id)}>
            {/* <tr> */}
                <td>{hanja}</td>
                <td>{kor}</td>
            </tr>
        ));
    };

    useEffect(() => {
        getHanSimilar();
    }, []);


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