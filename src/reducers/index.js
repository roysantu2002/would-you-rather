import { combineReducers } from "redux";
import authedUser from './authedUser'
import users from './users'

// import authReducer from "./authReducer";
export default combineReducers({
  authedUser,
  users
  // the authReducer will work only with authState
  // authState: authReducer,
});
