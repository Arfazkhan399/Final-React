// // src/store/auth/authReducer.js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/authActions";
// import { loginRequest,loginSuccess,loginFailure, logout} from "../actions/authActions";

// const initialState = {
//   loading: false,
//   user: null,
//   token: null,
//   error: null,
// };

// export default function authReducer(state = initialState, action) {
//   switch (action.type) {
//     case loginRequest:
//       return { ...state, loading: true, error: null };
//     case loginSuccess:
//       return { ...state, loading: false, user: action.payload.user, token: action.payload.token, error: null };
//     case loginFailure:
//       return { ...state, loading: false, error: action.payload };
//     case logout:
//       return { ...initialState };
//     default:
//       return state;
//   }
// }
// reducers/authReducer.js
const storedAuth = JSON.parse(localStorage.getItem('auth') || 'null');

const initialState = {
    user: storedAuth ? storedAuth.user : null,
    token: storedAuth ? storedAuth.token : null,
    loading: false,
    error: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            localStorage.removeItem('auth');
            return { ...state, user: null, token: null };
        default:
            return state;
    }
}
