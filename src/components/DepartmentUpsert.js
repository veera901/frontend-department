import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDepartmentAction,updateDepartmentAction,} from "../redux/DepartmentReducer";

export function DepartmentUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formEL = useRef();
  const state = useSelector((state) => state);


  const [name, setName] = useState(state.department.refdep.name);


  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateName = (d) => setName(d.target.value);

  const addDepartment = (d) => {
    d.preventDefault();
    {
    dispatch(
        createDepartmentAction({
          name,
        })
      );

       // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // reset the form
    setName("");
      }
  };

  const updateDepartment = () => {
    dispatch(
      updateDepartmentAction({
        id: state.department.refdep.id,
        name,
      })
    );

    // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // reset the form
    setName("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-info">
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
            required="required"
            onChange={(d) => updateName(d)}
            className="form-control"
            placeholder="Enter Name"
          />
        </div>

        <div className="mb-1">
          {state.department.refdep.name ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Department"
              onClick={() => updateDepartment()}
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