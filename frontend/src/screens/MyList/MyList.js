import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Button, Card, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { deleteTaskAction, listTasks } from "../../actions/tasksActions";
import Loading from "../../components/Loader/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import './MyList.css'


const MyList = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Extracts objects loading, tasks and error from current taskList state
  const taskList = useSelector(state => state.taskList);
  const { loading, tasks, error} = taskList;

  // Extracts object userInfo from current userLogin state
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // Extracts object success from current taskCreate state
  const taskCreate = useSelector(state => state.taskCreate);
  const { success: successCreate } = taskCreate;

  // Extracts objects loading, error and success from current taskDelete state
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

  // If userInfo is not populated, user is not logged in and will be
  // redirected to the landing page
  useEffect(() => {
    dispatch(listTasks());
    if(!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successDelete
  ])

  return (
    <div>
      {/* If userInfo is populated, displays content and users name with title */}
      <MainScreen title={`Welcome back ${userInfo && userInfo.name}`}>
      <Link to="/addtask">
        <Button className="add-button" size="lg">
          Add a task
        </Button>
      </Link>

      {/* Displays error related to deletion, if there is one */}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}

      {/* Displays error related to task list, if there is one */}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {tasks?.map(task => (
          <Accordion key={task._id}>
            <Accordion.Item eventKey="0">
              <Card className="card">
                <Card.Header className="card-header">
                  <span className="card-item">
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
