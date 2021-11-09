import { useEffect, useState } from "react";
import { Accordion, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MainScreen from "../../components/MainScreen";


const MyList = () => {

  const [tasks, setTasks] = useState([]);


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {

    }
  }

  const fetchNotes = async () => {
    const {data} = await axios.get('/api/notes');

    setTasks(data);
  };

  console.log(tasks)

  useEffect(() => {
    fetchNotes();
  }, [])
  return (
    <div>
      <MainScreen title='Welcome back!'>
      <Link to="/addtask">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add a task
        </Button>
      </Link>
      {
        tasks.map(task => (
          <Accordion key={task._id}>
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
                  <Accordion.Header>{task.title}</Accordion.Header>
                  </span>
                <div>
                  <Button href={`/task/${task._id}`}>Edit</Button>
                  <Button variant="danger" className="mx-2" onClick={() => deleteHandler(task._id)}>Delete</Button>
                </div>
                </Card.Header>
                <Card.Body>
                  <Accordion.Body>
                  <h4>
                    <Badge bg="success" text="light">Category - {task.category}</Badge>
                  </h4>
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
