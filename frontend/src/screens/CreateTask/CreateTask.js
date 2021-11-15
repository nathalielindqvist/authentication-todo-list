import React, { useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTaskAction } from '../../actions/tasksActions';
import Loading from '../../components/Loader/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import '../ProfilePage/ProfilePage.css'

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Extracts object loading from current state
  const taskCreate = useSelector(state => state.taskCreate);
  const { loading } = taskCreate;

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category){
      setError("Please fill in all the fields");
      return;
    }
    dispatch(createTaskAction(title, content, category));

    resetHandler();
    navigate("/mylist");
  };

  return (
    <div>
      <MainScreen title="Create a task">
        <Card>
          <Card.Header>Create a new task</Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>

              {/* Displays error message if there is an error */}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group className="inputField" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                type="title"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="inputField" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                as="textarea"
                value={content}
                placeholder="Content"
                rown={4}
                onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="inputField" controlId="content">
                <Form.Label>Category</Form.Label>
                <Form.Control
                type="content"
                value={category}
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading />}
              <Button type="submit" variant="primary">
                Create task
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset fields
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </MainScreen>

    </div>
  );
}

export default CreateTask
