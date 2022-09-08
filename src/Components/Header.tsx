import React from 'react'
import styled from 'styled-components';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AiOutlineHome } from 'react-icons/ai'
const Header = () => {

    const Header = styled.header``
    return (
        <Header>
            <div className='upperNav'>
                <div> <img className='headerImage1' src="./images/logo.png" alt="logo" />
                    <img className='headerImage2' src="./images/logoContent.png" alt="logo" />
                </div>
                <div>
                    <img className='headerImage3' src="./images/tiger.png" alt="logo" />
                    <img className='headerImage3' src="./images/chasma.png" alt="logo" />
                </div>
            </div>
            <Navbar collapseOnSelect expand="lg" className='navbar'>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto navItem">
                            <LinkContainer to="/">
                                <Nav.Link className='listItems'>
                                    <AiOutlineHome />
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <Nav.Link className='listItems'>ABOUT US</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/career">
                                <Nav.Link className='listItems'>CAREER</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/gallery">
                                <Nav.Link className='listItems'>GALLERY</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/contact">
                                <Nav.Link className='listItems'>CONTACT US</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link className='listItems'>LOGIN</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </Header >
    )
}

export default Header