import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from "../constants/userConstants";
import axios from 'axios';

// ---------- LOGIN ----------
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    // Define content type to be sent with api call
    const config = {
      headers: {
        "Content-type": "application/json"
      },
    };

    // POST api call, response stored in data variable
    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    },
      config,
    );

    // Send data response with dispatch
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Set localStorage item userInfo with credentials from data variable
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};

// ---------- LOGOUT ----------
export const logout = () => async (dispatch) => {
  // Remove item userInfo from localStorage
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};


// ---------- REGISTER ----------
export const register = (name, email, password, pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    // Define content type to be sent with api call
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // POST api call, response stored in data variable
    const { data } = await axios.post(
      "/api/users",
      { name, pic, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // Logs user in right away after registration is complete
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Set localStorage item userInfo with credentials from data variable
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};


// ---------- UPDATE USER ----------
export const updateProfile = (user) => async(dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

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

    // POST api call with current user sent as argument, response stored in data variable
    const { data } = await axios.post("/api/users/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data});

    // Makes sure user stays logged in after updated credentials
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data});

    // Set item userInfo in localStorage with new credentials
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
