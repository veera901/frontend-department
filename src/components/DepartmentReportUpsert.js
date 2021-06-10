import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDepartmentReportAction } from "../redux/DepartmentReportReducer";

export function DepartmentReportUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const [name, setName] = useState(state.department.refdep.name);
  const [description, setDescription] = useState(state.department.refdep.description);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateName = (d) => setName(d.target.value);
  const updateDescription = (d) => setDescription(d.target.value);

  const addDepartmentReport = (d) => {
    d.preventDefault();
    console.log(name);

    // THIS IS REDUX ACTION CALLING
    dispatch(
        createDepartmentReportAction({
          name,
          description,
        })
      );

       // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

     // A2: navigate to another page
    // history.push("/list-departmentreport");

    // reset the form
    setName("");
    setDescription("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary">
          {state.department.refdep.name
            ? "Update DepartmentReport"
            : "Create DepartmentReport"}
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
          <input
            type="text"
            value={description}
            onChange={(d) => updateDescription(d)}
            className="form-control"
            placeholder="Enter description"
          />
        </div>

        <div className="mb-1">
          {state.department.refdep.name ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update DepartmentReport"
              onClick={() => {}}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Add DepartmentReport"
              onClick={(d) => addDepartmentReport(d)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}