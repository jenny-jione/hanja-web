import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getCookie, removeCookie } from '../js/cookie';
import { useNavigate } from 'react-router-dom';


function CommonNavbar() {
    const navigate = useNavigate();
    const randomNum = Math.floor(Math.random() * 1817) + 1;
    return (
        <Navbar className="justify-content-center" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/home">홈</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/list">한자 목록</Nav.Link>
                    <Nav.Link href={`/test/${randomNum}`}>시험</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>{getCookie('userInfo')}</Nav.Link>
                </Nav>
                <Row>
                    <Col xs="auto">
                        <Button onClick={() => {
                            removeCookie('myToken', {path:'/'});
                            removeCookie('userInfo', {path:'/'});
                            navigate('/');
                        }} variant="secondary">로그아웃</Button>
                    </Col>
                    </Row>
            </Container> 
        </Navbar>
    );
}

export default CommonNavbar;

