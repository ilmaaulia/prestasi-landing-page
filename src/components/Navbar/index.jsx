import React from 'react'
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold d-flex align-items-center"
        >
          <img
            alt=""
            src="/logo-ipi.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Prestasi IPI
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto align-items-center gap-2 d-flex">
            <Nav.Link as={NavLink} to="/">
              Beranda
            </Nav.Link>
            <NavDropdown title="Prestasi Mahasiswa" id="prestasi-mahasiswa-dropdown">
              <NavDropdown.Item as={NavLink} to="/achievements/academic" className="dropdown-item">
                Akademik
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/achievements/non-academic" className="dropdown-item">
                Non Akademik
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/students">
              Mahasiswa Berprestasi
            </Nav.Link>
            <Nav.Link as={NavLink} to="/news">
              Berita Prestasi
            </Nav.Link>
          </Nav>
          <Nav className="ms-lg-3 my-2">
            <Button
              as="a"
              href="https://prestasi-cms.vercel.app/login"
              variant="outline-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
