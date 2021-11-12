import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Button, Form } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import ErrorMessage from '../../components/ErrorMessage';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../components/Loader/Loading';
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
  if(!userInfo){
    navigate("/")
  } else {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPic(userInfo.pic);
  }
  }, [navigate, userInfo])

   const postDetails = (pics) => {
    if(!pics) {
      return setPicMessage("Please select an image");
    }

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
        console.log(data)
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      return setPicMessage("Please select an image");
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  }

  return (
    <div>
      <MainScreen title="EDIT PROFILE">
        <div>
          <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Profile Updated
                    </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group className="inputField" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="inputField" constolId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="inputField" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                  type="password"
                  palceholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="inputField" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                  type="password"
                  palceholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>{" "}
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <Form.Group className="inputField" controlId="pic">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control type="file"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            </Col>
            <Col className="colProfilePic"
            >
              <img src={pic} alt={name} className="profilePic" />
              </Col>
          </Row>
        </div>
      </MainScreen>
    </div>
  )
}

export default ProfilePage
