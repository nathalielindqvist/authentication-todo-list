import axios from 'axios';
import {
  TASKS_CREATE_FAIL,
  TASKS_CREATE_REQUEST,
  TASKS_CREATE_SUCCESS,
  TASKS_DELETE_FAIL,
  TASKS_DELETE_REQUEST,
  TASKS_DELETE_SUCCESS,
  TASKS_LIST_FAIL,
  TASKS_LIST_REQUEST,
  TASKS_LIST_SUCCESS
} from '../constants/tasksConstants';

export const listTasks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASKS_LIST_REQUEST
    });

    // Extracts object userInfo from current state
    const {
      userLogin: { userInfo },
    } = getState();

    // Extracts users token to be sent as authorization in api call
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // GET api call, response stored in data variable
    const { data } = await axios.get(`/api/tasks`, config);

    // Send data response with dispatch
    dispatch({
      type: TASKS_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message =
    error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: TASKS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createTaskAction = (title, content, category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASKS_CREATE_REQUEST,
    });

    // Extracts object userInfo from current state
    const {
      userLogin: { userInfo },
    } = getState();

    // Defines content type and
    // extracts users token to be sent as authorization in api call
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // POST api call, response stored in data variable
    const { data } = await axios.post(
      `/api/tasks/create`,
      { title, content, category },
      config
    );

    // Send data response with dispatch
    dispatch({
      type: TASKS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message;

      dispatch({
        type: TASKS_CREATE_FAIL,
        payload: message,
      });
  }
};

export const deleteTaskAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASKS_DELETE_REQUEST,
    });

    // Extracts object userInfo from current state
    const {
      userLogin: { userInfo },
    } = getState();

    // Extracts users token to be sent as authorization in api call
      const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // DELETE api call, response stored in data variable
    const { data } = await axios.delete(`/api/tasks/${id}`, config);

    // Send data response with dispatch
    dispatch({
      type: TASKS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: TASKS_DELETE_FAIL,
      payload: message,
    });
  }
};