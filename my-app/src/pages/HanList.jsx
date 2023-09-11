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
    const [userInput, setUserInput] = useState('');
    const [searchText, setSearchText] = useState('');
    const [pageInfo, setPageInfo] = useState({
        page: 1,
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

    const handleSubmit = (e) => {
        e.preventDefault();        
        setSearchText(userInput);
        setPageInfo({
            page: 1,
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
      }, [pageInfo.page, pageInfo.limit, searchText]);

    return (
        <>
        <CommonNavbar/>
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Input word"
                    aria-label="User Input"
                    aria-describedby="basic-addon2"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <Button type="submit" variant="outline-secondary" id="button-addon2">
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