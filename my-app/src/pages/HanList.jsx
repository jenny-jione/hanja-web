import { useEffect, useState } from 'react';
import { getList } from '../js/api';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import CommonNavbar from '../component/RBSNav';

const HanList = () => {
    const [list, setList] = useState([]);
    const [searchText, setSearchText] = useState('');
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
        const result = await getList(pageInfo, searchText);
        if (typeof result === 'object') {
            setList(result?.data);
        }
    }

    // TODO: 문제 해결하기 => 최초 1번은 검색이 되는데, 그 후에는 엔터를 눌러도 api 요청이 가지 않음. 왜??
    // 그리고 page:0으로 하면 애초에 최초에도 검색이 안됨. 처음에 설정한 pageInfo값과 값이 같으면 요청이 가지 않는 것 같음. 이유 찾기
    const handelSubmit = (e) => {
        e.preventDefault();        
        console.log(searchText);
        setPageInfo({
            page: 0,
            limit: 10,
        })
    }

    // 테이블 렌더 함수
    const renderTableFn = () => {
        const handleRowClick = (id) => {
            navigate(`/detail/${id}`)
        }
      return list.map(({ id, hanja, kor, radical, radical_name, level, count }) => (
        <tr key={id} onClick={() => handleRowClick(id)}>
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
        <Form onSubmit={handelSubmit}>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Input word"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2">
                Search
                </Button>
            </InputGroup>
        </Form>

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