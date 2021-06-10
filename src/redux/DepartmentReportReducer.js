const initState = {
    list: [],
  
    refdep: {},
    sampleList: ["Delhi", "Kolkata", "Chennai", "Mumbai"],
  };
  
  // ACTION TYPES
  const DEPARTMENTREPORT_CREATE = "DEPARTMENTREPORT_CREATE";
  const DEPARTMENTREPORT_UPDATE = "DEPARTMENTREPORT_UPDATE";
  const DEPARTMENTREPORT_DELETE = "DEPARTMENTREPORT_DELETE";
  const DEPARTMENTREPORT_GET_ALL = "DEPARTMENTREPORT_GET_ALL";
  const DEPARTMENTREPORT_GET_BY_ID = "DEPARTMENTREPORT_GET_BY_ID";
  
  const REF_DEPARTMENTREPORT = "REF_DEPARTMENTREPORT";
  
  // ACTIONS :: COmponents are interacting with this action
  export function createDepartmentReportAction(payload) {
    //return { type: DEPARTMENTREPORT_CREATE, payload: payload };

     // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/departmentreport/";
    const requestBody = { ...payload, };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: DEPARTMENTREPORT_CREATE, payload: payload });
  };
  }
  
  export function updateDepartmentReportAction(payload) {
    //return { type: DEPARTMENTREPORT_UPDATE, payload: payload };
    return async (dispatch) => {
      // WE HV TO CALL THE SPRINT1 / SPRING BOOT
      const url = `http://localhost:8080/api/departmentreport/${payload.id}`;
      const requestBody = { ...payload, };
  
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      // update the ui.
      dispatch(updateRefDepartmentReport({}));
    };
  }
  
  export function deleteDepartmentReportAction(payload) {
    //return { type: DEPARTMENTREPORT_DELETE, payload: payload };

    // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/departmentreport/${payload.id}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllDepartmentReportAction());
  };
}
  
  export function getAllDepartmentReportAction(payload) {
    //return { type: DEPARTMENTREPORT_GET_ALL, payload: payload };

    // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/departmentreport/";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const departmentreportList = await response.json();
    console.log(departmentreportList);

    // Update the UI
    dispatch({ type: DEPARTMENTREPORT_GET_ALL, payload: departmentreportList });
  };
}
  
  export function getByIdDepartmentReportAction(payload) {
    //return { type: DEPARTMENTREPORT_GET_BY_ID, payload: payload };
    return async (dispatch) => {
      const url = `http://localhost:8080/api/departmentreport/${payload.id}`;
      const response = await fetch(url);
      const departmentreportObj = await response.json();
  
      // this wil update the refemp
      dispatch(updateRefDepartmentReport(departmentreportObj));
    };
  }

  export function updateRefDepartmentReport(payload) {
    return { type: REF_DEPARTMENTREPORT, payload: payload };
  }
  
  // REDUCER LOGIC
  export function DepartmentReportReducer(state = initState, action) {
    switch (action.type) {
      case DEPARTMENTREPORT_CREATE:
        return { ...state, list: [action.payload, ...state.list] };
      case DEPARTMENTREPORT_UPDATE:
        // TODO
        return state;
      case DEPARTMENTREPORT_DELETE:
        // TODO
        const oldList = state.list;
        oldList.splice(action.payload, 1);
        console.log("OL", oldList);
  
        return { ...state, list: [...oldList] };
      case DEPARTMENTREPORT_GET_ALL:
        // TODO
        return state;
      case DEPARTMENTREPORT_GET_BY_ID:
        // TODO
        return state;
  
      case REF_DEPARTMENTREPORT:
        return { ...state, refdep: action.payload };
  
      default:
        return state;
    }
  }