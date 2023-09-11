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
    return (
        <Navbar className="justify-content-center" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/home">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/list">list</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>{getCookie('userInfo')}</Nav.Link>
                </Nav>
                <Row>
                    <Col xs="auto">
                        <Button onClick={() => {
                            removeCookie('myToken', {path:'/'});
                            removeCookie('userInfo', {path:'/'});
                            return navigate('/');
                        }} variant="secondary">Logout</Button>
                    </Col>
                    </Row>
            </Container> 
        </Navbar>
    );
}

export default CommonNavbar;

