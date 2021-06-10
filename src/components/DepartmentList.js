import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteDepartmentAction,
  updateRefDepartment,
  getAllDepartmentAction,
  getByIdDepartmentAction,
} from "../redux/DepartmentReducer";
import { DepartmentReportModal } from "./DepartmentReportModal";


export function DepartmentList() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(getAllDepartmentAction());
    }, []);
  
  
    const [successOperation, setSuccessOperation] = useState(false);
  
    const deleteDepartment = (item, index) => {
      dispatch(deleteDepartmentAction(index));
  
      setSuccessOperation(true);
      setTimeout(() => setSuccessOperation(false), 2000);
    };
  
    const updateDepartment = (item) => {
      // we are doing this so that we can access this objec in the form page
      dispatch(updateRefDepartment(item));
  
      // form page
      history.push("/create-department");
    };
    const getDepartmentById = (item) => {
      dispatch(getByIdDepartmentAction(item));
    };
  
    return (
      <div className="row">
        <div className="col-3 col-md-2 d-none d-md-block"></div>
        <div className="col-12 col-md-8">
          <h3 className="alert alert-secondary">Department List</h3>
          {state.department.error && (
            <div className="alert alert-danger">Can't connect error</div>
          )}
  
          {successOperation && (
            <div className="alert alert-success">Operation Success</div>
          )}

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">NAME</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...state.department.list].map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>
                  <input
                    type="button"
                    onClick={() => updateDepartment(item)}
                    value="Edit"
                    className="btn btn-link"
                  />{" "}
                  /
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => deleteDepartment(item, index)}
                    className="btn btn-link text-danger"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-3 col-md-2 d-none d-md-block"></div>
    </div>



  
  );
}