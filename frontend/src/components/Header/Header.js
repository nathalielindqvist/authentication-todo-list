import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown
 } from 'react-bootstrap';
 import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
  <Container>
    <Navbar.Brand>
      <Link to="/">Todays ToDo</Link>
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link className="nav-link" to="/mylist">My list</Link>
        <NavDropdown title="User" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link to="#">Profile</Link>
              </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={() => {
              localStorage.removeItem("userInfo");
              navigate("/");
          }}>
            {/* <Link to="#">Logout</Link> */}
            Logout
            </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-sm-2"
          aria-label="Search"
        />
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </div>
  )
}

export default Header

