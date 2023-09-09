import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function CommonNavbar() {
    return (
        <Navbar className="justify-content-center" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default CommonNavbar;

