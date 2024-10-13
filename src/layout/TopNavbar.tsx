import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const TopNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Extensive Reading</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/editor">Editor</Nav.Link>
                    <Nav.Link href="/books">Books</Nav.Link>
                    <Nav.Link href="/dicts">Dictionaries</Nav.Link>
                    <Nav.Link href="/words">Words</Nav.Link>
                    <Nav.Link href="/langs">Languages</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
    );

};

export default TopNavbar;