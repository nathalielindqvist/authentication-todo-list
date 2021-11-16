import { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loader/Loading';
import MainScreen from '../../components/MainScreen'

const RegisterPage = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Extract objects loading, error and userInfo from current state
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // If userInfo is populated, redirect user to task list page
  useEffect(() => {
    if (userInfo) {
      navigate("/mylist");
    }
  }, [navigate, userInfo])


  const submitHandler = async (e) => {
    e.preventDefault();

    if(password !== confirmpassword) {
      setMessage('Passwords do not match');
    }
    else {
      dispatch(register(name, email, password, pic));
    }
  }

  const postDetails = (pics) => {

    if(!pics) {
      return setPicMessage("Please select an image");
    }

    // Config for image hosting on Cloudinary
    setPicMessage(null);
    if(pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'todays-todo');
      data.append('cloud_name', 'ddzovsobv');
      fetch('https://api.cloudinary.com/v1_1/ddzovsobv/image/upload', {
        method: "post",
        body: data,
      }).then((res) => res.json()).then((data) => {
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      return setPicMessage("Please select an image");
    }
  }

  return (
    <div>
     <MainScreen title="REGISTER">
      <div className="loginContainer">

        {/* Display error from state, if there is one */}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

        {/* Display message of passwords do not match */}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* Display error related to Cloudinary config, if there is one */}
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>

    </div>
  )
}

export default RegisterPage
