import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { DepartmentReducer } from "./DepartmentReducer";
import { DepartmentReportReducer } from "./DepartmentReportReducer";

const rootReducer = combineReducers({
  department: DepartmentReducer,
  departmentReport: DepartmentReportReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };