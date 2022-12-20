
import {Container, Nav, Navbar as NavbarBS}  from "react-bootstrap";
import { NavLink } from "react-router-dom";

export interface IAppProps {
}

export function NavBar (props: IAppProps) {
  return (
    <NavbarBS className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
            <Nav.Link  to='/' as={NavLink}>
                Home
            </Nav.Link>
            <Nav.Link  to='/store' as={NavLink}>
                Store
            </Nav.Link>
            <Nav.Link  to='/about' as={NavLink}>
                About
            </Nav.Link>
        </Nav>

        Hi

      </Container>
    </NavbarBS>
  );
}
