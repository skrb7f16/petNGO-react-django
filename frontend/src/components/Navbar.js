import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'

export default function Header(props) {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
  <Navbar.Brand href="#home">PET NGO</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="/">{props.isLoggedIn?props.user.username:"Login Please"}</Nav.Link>
    <Nav.Link 
    href="#"
    onClick={e=>{
      e.preventDefault();
      localStorage.removeItem('TOKEN')
      props.setIsLoggedIn(false)
      props.setUser({})
    }}
    >{props.isLoggedIn?"LOGOUT":""}</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
};
