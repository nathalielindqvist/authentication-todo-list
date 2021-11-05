import { Container, Row, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Todays ToDo</h1>
              <p className="subtitle">Why put off to tomorrow what you can do today!</p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="landingbutton" variant="outline-primary">
                  Register
                </Button>
              </Link>

            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
