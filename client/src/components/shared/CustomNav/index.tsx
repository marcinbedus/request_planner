import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavbarLogic } from "./logic";

export const CustomNav = () => {
  const { handleLogout } = useNavbarLogic();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand to={"/"} as={Link}>
          requestPlanner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/add-request">
              add request
            </Nav.Link>
          </Nav>
          <Button onClick={handleLogout} variant="outline-dark">
            logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
