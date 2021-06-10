import logo from "./logo.svg";
import "./App.css";
import { DepartmentUpsert } from "./components/DepartmentUpsert";
import { DepartmentList } from "./components/DepartmentList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppNavBar } from "./common/AppNavBar";
import { DepartmentReportReducer } from "./redux/DepartmentReportReducer";
import { DepartmentReportUpsert } from "./components/DepartmentReportUpsert";
import { DepartmentReportList } from "./components/DepartmentReportList";

function App() {
  return (
    <Router>
      <AppNavBar />

      <Switch>
        <Route path="/add-department">
          <DepartmentUpsert />
        </Route>

        <Route path="/list-department">
          <DepartmentList />
        </Route>

        <Route path="/add-departmentReport">
          <DepartmentReportUpsert />
        </Route>
        <Route path="/list-departmentReport">
          <DepartmentReportList />
        </Route>

        <Route exact path="/">
          <DepartmentList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;