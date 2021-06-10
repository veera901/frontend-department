import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function AppNavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Online Corona Consultancy
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/add-department">
            Add Department
          </Nav.Link>
          <Nav.Link as={Link} to="/list-department">
            Department List
          </Nav.Link>
          <Nav.Link as={Link} to="/add-departmentReport">
            Add Department Report
          </Nav.Link>
          <Nav.Link as={Link} to="/list-departmentReport">
            Department Report List
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}