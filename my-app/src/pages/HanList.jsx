import { useEffect, useState } from 'react';
import { getList } from '../js/api';
import { useNavigate } from "react-router-dom";
import CommonNavbar from '../component/RBSNav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Table from 'react-bootstrap/Table';

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
    const [ totalCount, setTotalCount ] = useState('');
    const [ sortOrder, setSortOrder ] = useState('ganada');
    const [ isAsc, setIsAsc ] = useState(true); // TODO toggle sort order ing
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '리스트';
    });

    // 텍스트 리스트
    const getHanList = async () => {
        const result = await getList(pageInfo, searchText, sortOrder);
        if (typeof result === 'object') {
            setList(result?.data?.data);
            setTotalCount(result?.data?.meta?.totalCount);
        }
    }

    // TODO toggle sort order ing
    // sortOrder change
    const changeSortOrder = (key) => {
        console.log('key:', key);
        // setSortOrder(key);
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
        return list.map(({ id, hanja, kor, radical, radical_name, level, count }, index) => (
            <tr key={id} onClick={() => handleRowClick(id)}>
                <td>{index+1}</td>
                <td>{hanja}</td>
                <td>{kor}</td>
                <td>{radical} : {radical_name}</td>
                <td>{level}</td>
                <td>{count}</td>
            </tr>
        ));
    };

    // TODO toggle sort order ing
    useEffect(() => {
        getHanList();
        console.log('====use effect !!====')
    }, [pageInfo.page, pageInfo.limit, searchText, sortOrder]);

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

        <Container>
            <Row>
                <Col>
                    <div className="text-center">
                        {totalCount}
                    </div>
                </Col>
            </Row>
        </Container>

        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>idx</th>
                <th>han</th>
                <th onClick={() => setSortOrder('ganada')}>kor</th>
                <th>radical</th>
                {/* <th onClick={() => changeSortOrder('level')}>level</th> // TODO toggle sort order ing */}
                {/* <th onClick={() => setIsAsc(!isAsc)}>level {isAsc ? setSortOrder('level_asc') : setSortOrder('level_desc')}</th> // TODO toggle sort order ing */}
                <th onClick={() => setIsAsc(!isAsc)}>level {isAsc ? changeSortOrder('level_asc') : changeSortOrder('level_desc') }</th>
                <th onClick={() => setSortOrder('count_desc')}>count</th>
            </tr>
            </thead>
            <tbody>{renderTableFn()}</tbody>
        </Table>
        </>
    )
}

export default HanList;