import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function CommonNavbar() {
    return (
        <Navbar className="justify-content-center" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/list">list</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default CommonNavbar;

