import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Button, Card, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { deleteTaskAction, listTasks } from "../../actions/tasksActions";
import Loading from "../../components/Loader/Loading";
import ErrorMessage from "../../components/ErrorMessage";


const MyList = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const taskList = useSelector(state => state.taskList);
  const { loading, tasks, error} = taskList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const taskCreate = useSelector(state => state.taskCreate);
  const { success: successCreate } = taskCreate;

  const taskDelete = useSelector(state => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = taskDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Have you finished this task?")) {
      dispatch(deleteTaskAction(id));
    }
  }

  useEffect(() => {
    dispatch(listTasks())
    if(!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    successDelete,
    navigate,
    userInfo
  ])

  return (
    <div>
      <MainScreen title={`Welcome back ${userInfo.name}`}>
      <Link to="/addtask">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add a task
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {tasks?.map(task => (
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
                  <Button variant="success" className="mx-2" onClick={() => deleteHandler(task._id)}>Task Complete</Button>
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
                      Created on{" "}
                      <cite title="Source Title">
                        {task.createdAt.substring(0, 10)}
                      </cite>
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
