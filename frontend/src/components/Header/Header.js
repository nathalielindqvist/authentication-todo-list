import {
  Container,
  Nav,
  Navbar,
  NavDropdown
 } from 'react-bootstrap';
 import { Link, useNavigate } from 'react-router-dom';
 import { useDispatch, useSelector } from 'react-redux';
 import { logout } from '../../actions/userActions';

const Header = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
  <Container>
    <Navbar.Brand>
      <Link to="/">Todays ToDo</Link>
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">

      {userInfo ?
      <Nav className="mr-auto">
        <Link className="nav-link" to="/mylist">My list</Link>
        <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile">
            Profile
              </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={logoutHandler}>
            Logout
            </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      : <Nav>
        <Link className="nav-link" to="/login">Login</Link>
        </Nav>}
    </Navbar.Collapse>
  </Container>
</Navbar>
    </div>
  )
}

export default Header

