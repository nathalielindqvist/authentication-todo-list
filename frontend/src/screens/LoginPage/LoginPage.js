import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loader/Loading';
import MainScreen from '../../components/MainScreen';
import './LoginPage.css';

const LoginPage = ({ history }) => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);



const submitHandler = async (e) => {
  e.preventDefault()

  try {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    setLoading(true);

    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    },
      config,
    );

    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setLoading(false);
  } catch (err) {
    setError(err.response.data.message);
    setLoading(false);
  }
}

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