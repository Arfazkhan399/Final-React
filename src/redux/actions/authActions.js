// src/store/auth/authActions.js

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const logoutAction = () => ({ type: LOGOUT });

// Thunk: login
export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await fetch(`http://localhost:8080/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const users = await res.json();
    console.log("API response:", users); // Debug

    if (users.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = users[0];
    const token = btoa(`${user.id}:${Date.now()}`); // fake token for training

    // Save to localStorage
    localStorage.setItem('auth', JSON.stringify({ user, token }));

    dispatch(loginSuccess(user, token));
  } catch (err) {
    dispatch(loginFailure(err.message || 'Login failed'));
  }
};

// Thunk: logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('auth');
  dispatch(logoutAction());
};

// Thunk: load from localStorage (on app start)
export const loadAuthFromStorage = () => (dispatch) => {
  const raw = localStorage.getItem('auth');
  if (raw) {
    try {
      const { user, token } = JSON.parse(raw);
      dispatch(loginSuccess(user, token));
    } catch {
      localStorage.removeItem('auth');
    }
  }
};
