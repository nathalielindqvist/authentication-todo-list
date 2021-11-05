import { Accordion, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import notes from "../../data/notes";

const MyList = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {

    }
  }
  return (
    <div>
      <MainScreen title='Welcome back!'>
      <Link to="/addtask">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add a task
        </Button>
      </Link>
      {
        notes.map(task => (
          <Accordion>
            <Accordion.Item eventKey="0">
        <Card style={{ margin: 10 }}>
          <Card.Header style={{ display: "flex" }}>
            <span style={{
              color: "black",
              textDecoration: "none",
              flex: 1,
              cursor: "pointer",
              alignSelf: "center",
              fontSize: 18,
            }}>
            <Accordion.Header style={{border: "none"}}>{task.title}</Accordion.Header>
            </span>
          <div>
            <Button href={`/task/${task._id}`}>Edit</Button>
            <Button variant="danger" className="mx-2" onClick={() => deleteHandler(task._id)}>Delete</Button>
          </div>
          </Card.Header>
          <Card.Body>
            <h4>
              <Badge bg="success" text="light">Category - {task.category}</Badge>
            </h4>
            <Accordion.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {task.content}
              </p>
              <footer className="blockquote-footer">
                Created on - date
              </footer>
            </blockquote>
            </Accordion.Body>
          </Card.Body>
        </Card>
            </Accordion.Item>
          </Accordion>
        ))
      }
      </MainScreen>
    </div>
  )
}

export default MyList
