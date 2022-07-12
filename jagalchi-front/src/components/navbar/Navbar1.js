import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import logo from "../../assets/logo.png";
import { isLoggedIn } from '../functions/loginCheck';
function Navbar1(params) {
    const [loggedIn, setLoggedin] = useState(false);
    
    useEffect(()=> {
        if(sessionStorage.getItem("loggedIn") === "true"){
            const l = sessionStorage.getItem("loggedIn");
            console.log(l);
            setLoggedin(true);
        }
        else {
            setLoggedin(false);
        }
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>{' '}
                    자갈치 시장
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" style={{color: "red"}}>Alpha v0.1.0</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Pages" id="collasible-nav-dropdown">
                               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            {!loggedIn ? 
                                 <>
                                    <Nav.Link href="/join">Create Account</Nav.Link>
                                    <a href='/login'><Button variant="primary" style={{}}> Sign In </Button>{' '}</a>
                                </>
                                :
                                <Nav>
                                    <Nav.Link href="/user/:id">My Account</Nav.Link>
                                    <a href='/logout'><Button variant="primary" style={{}}> Logout </Button>{' '}</a>
                                </Nav>
                            }
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbar1;