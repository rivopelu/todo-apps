import {combineReducers} from "redux";
import {MainReducers} from "./Reducers";

export default combineReducers({
  MainReducers: MainReducers.reducer
});
