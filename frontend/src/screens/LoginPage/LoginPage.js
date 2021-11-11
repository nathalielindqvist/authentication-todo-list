import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loader/Loading';
import MainScreen from '../../components/MainScreen';
import { login } from '../../actions/userActions';
import './LoginPage.css';

const LoginPage = () => {

  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const dispatch = useDispatch();

const userLogin = useSelector(state => state.userLogin);
const { loading, error, userInfo } = userLogin;

useEffect(() => {
 if(userInfo) {
  navigate("/mylist")
 }
}, [navigate, userInfo])

const submitHandler = async (e) => {
  e.preventDefault()

  dispatch(login(email, password));
};

  return (
    <div>
      <MainScreen title='LOGIN'>
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="input-field" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="input-field" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
            New user? <Link to="/register">Register here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </div>
  )
}

export default LoginPage