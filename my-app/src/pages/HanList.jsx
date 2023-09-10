import { useEffect, useState } from 'react';
import { getList } from '../js/api';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import CommonNavbar from '../component/RBSNav';

const HanList = () => {
    const [list, setList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        page: 0,
        totalPage: 1,
        limit: 10,
        total: 0,
      });
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '홈';
    });

    // 텍스트 리스트
    const getHanList = async () => {
        const result = await getList(pageInfo);
        if (typeof result === 'object') {
            setList(result?.data);
        }
    }

    // 테이블 렌더 함수
    const renderTableFn = () => {
        const handleRowClick = (id) => {
            navigate(`/check/${id}`)
        }
      return list.map(({ id, hanja, kor, radical, radical_name, level, count }) => (
        <tr onClick={() => handleRowClick(id)}>
            <td>{id}</td>
            <td>{hanja}</td>
            <td>{kor}</td>
            <td>{radical} : {radical_name}</td>
            <td>{level}</td>
            <td>{count}</td>
        </tr>
        ));
    };

    useEffect(() => {
        getHanList();
      }, [pageInfo.page, pageInfo.limit]);

    return (
        <>
        <CommonNavbar/>
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>idx</th>
                <th>han</th>
                <th>kor</th>
                <th>radical</th>
                <th>level</th>
                <th>count</th>
            </tr>
            </thead>
            <tbody>{renderTableFn()}</tbody>
        </Table>
                </>
    )
}

export default HanList;