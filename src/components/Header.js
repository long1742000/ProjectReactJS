import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png'
import { useLocation, useNavigate } from 'react-router-dom';

import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import information from '../store/Information';
import { useState } from 'react';
import DetailModal from './DetailModal';

const Header = (props) => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        toast.success('Log out success !!!')
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logoApp}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        Project React</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {(localStorage.getItem('user') || window.location.pathname === "/") &&


                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                                <NavLink to="/users" className="nav-link">List User</NavLink>
                            </Nav>
                            <Nav>
                                {localStorage.getItem('user') &&
                                    <span className='nav-link'>Welcome, {information.last_name}</span>
                                }
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    {!localStorage.getItem('user') &&
                                        <NavLink to="/login" className="dropdown-item">Login</NavLink>
                                    }
                                    {localStorage.getItem('user') &&
                                        <>
                                            <span className="dropdown-item detail" onClick={() => { setShowModal(true) }}>Detail</span>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => { logout() }}>
                                                Logout
                                            </NavDropdown.Item>
                                        </>
                                    }
                                </NavDropdown>

                            </Nav>
                        </Navbar.Collapse>
                    }
                </Container>
            </Navbar >

            <DetailModal
                show={showModal}
                handleClose={handleClose}
            ></DetailModal>
        </>
    )
}

export default Header;