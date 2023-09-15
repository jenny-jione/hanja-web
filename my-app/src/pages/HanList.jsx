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
import { convertLevel } from '../js/common';

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
    const [ isAsc, setIsAsc ] = useState(true);
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

    // sortOrder change
    const changeSortOrder = (key) => {
        console.log('key:', key);
        setIsAsc(!isAsc);
        if (isAsc){
            setSortOrder(key+'_asc');
        } else {
            setSortOrder(key+'_desc');
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
        return list.map(({ id, hanja, kor, radical, radical_name, level, count, stroke_count }, index) => (
            <tr key={id} onClick={() => handleRowClick(id)}>
                <td>{index+1}</td>
                <td>{hanja}</td>
                <td>{kor}</td>
                <td>{radical} : {radical_name}</td>
                {/* <td>{convertLevel(level)}</td> */}
                <td>{level[1]=='0' ? level[0]+'급' : '준'+level[0]}</td>
                <td>{count}</td>
                <td>{stroke_count}</td>
            </tr>
        ));
    };

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
                <th onClick={() => changeSortOrder('level')}>level</th>
                <th onClick={() => changeSortOrder('count')}>count</th>
                <th onClick={() => changeSortOrder('stroke')}>stroke</th>
            </tr>
            </thead>
            <tbody>{renderTableFn()}</tbody>
        </Table>
        </>
    )
}

export default HanList;