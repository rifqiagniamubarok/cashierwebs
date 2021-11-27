import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { parseCookies, destroyCookie } from 'nookies';

function NavbarComponent() {
  const cookies = parseCookies();
  const handleCookieDestroy = () => {
    destroyCookie(null, 'id');
    destroyCookie(null, 'name');
  };
  return (
    <Navbar className="navbar-component" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-component-item-font">{cookies.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-component-item">
            <Nav.Link href="/dashboards">Dashboard</Nav.Link>
            <Nav.Link href="/items ">Items</Nav.Link>
            <Nav.Link href="/stock">Stock</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">History of purchases</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">History of Sales</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Profit Report</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Setting</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">About Cashier Web</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={handleCookieDestroy}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
