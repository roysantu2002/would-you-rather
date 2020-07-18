import { combineReducers } from "redux";
import authReducer from "./authReducer";
export default combineReducers({
  // the authReducer will work only with authState
  authState: authReducer,
});
