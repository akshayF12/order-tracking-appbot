import { combineReducers } from "redux";
import faqReducer from "./usersReducer";
// other reducers needs to add here

const rootReducers = combineReducers({
  usersData: faqReducer,
});

export default rootReducers;
