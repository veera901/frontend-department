import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDepartmentAction } from "../redux/DepartmentReducer";

export function DepartmentUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const [name, setName] = useState(state.department.refdep.name);


  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateName = (d) => setName(d.target.value);

  const addDepartment = (d) => {
    d.preventDefault();
    console.log(name);

    // THIS IS REDUX ACTION CALLING
    dispatch(
        createDepartmentAction({
          name,
        })
      );

       // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

     // A2: navigate to another page
    // history.push("/list-department");

    // reset the form
    setName("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary">
          {state.department.refdep.name
            ? "Update Department"
            : "Create Department"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Operation Success</div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={name}
            onChange={(d) => updateName(d)}
            className="form-control"
            placeholder="Enter name"
          />
        </div>

        <div className="mb-1">
          {state.department.refdep.name ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Department"
              onClick={() => {}}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Add Department"
              onClick={(d) => addDepartment(d)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}