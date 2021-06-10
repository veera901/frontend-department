const initState = {
    list: [],
    refdep: {},
    error: false,
  };
  
  // ACTION TYPES
  const DEPARTMENT_CREATE = "DEPARTMENT_CREATE";
  const DEPARTMENT_UPDATE = "DEPARTMENT_UPDATE";
  const DEPARTMENT_DELETE = "DEPARTMENT_DELETE";
  const DEPARTMENT_GET_ALL = "DEPARTMENT_GET_ALL";
  const DEPARTMENT_GET_BY_ID = "DEPARTMENT_GET_BY_ID";

  const SERVER_ERROR = "SERVER_ERROR";
  const REF_DEPARTMENT = "REF_DEPARTMENT";
  
  // ACTIONS :: COmponents are interacting with this action
  export function createDepartmentAction(payload) {
    //return { type: DEPARTMENT_CREATE, payload: payload };
  
    // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/department/add";
    const requestBody = { ...payload };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: DEPARTMENT_CREATE, payload: payload });
  };
}
  
  export function updateDepartmentAction(payload) {
    //return { type: DEPARTMENT_UPDATE, payload: payload };
  
    return async (dispatch) => {
      // WE HV TO CALL THE SPRINT1 / SPRING BOOT
      const url = `http://localhost:8080/api/department/update`;
      const requestBody = { ...payload };
  
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      // update the ui.
      dispatch(updateRefDepartment({}));
    };
  }
  
  export function deleteDepartmentAction(payload) {
    //return { type: DEPARTMENT_DELETE, payload: payload };
  
    // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/department/del/${payload.id}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllDepartmentAction());
  };
}
  
  export function getAllDepartmentAction(payload) {
    //return { type: DEPARTMENT_GET_ALL, payload: payload };
  
   // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    try{
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/department/getall";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const departmentList = await response.json();
    //console.log(departmentList);

    // Update the UI
    dispatch({ type: DEPARTMENT_GET_ALL, payload: departmentList });
  }  catch (error) {
    console.log(error);
    dispatch({ type: SERVER_ERROR, payload: true });

    const localDepartmentStringList = localStorage.getItem("departmentList");
    const localDepartmentList = JSON.parse(localDepartmentStringList);
    dispatch({ type: DEPARTMENT_GET_ALL, payload: localDepartmentList });
  }
 };
}
  
  export function getByIdDepartmentAction(payload) {
    //return { type: DEPARTMENT_GET_BY_ID, payload: payload };
   
    return async (dispatch) => {
      const url = `http://localhost:8080/api/department/${payload.id}`;
      const response = await fetch(url);
      const departmentObj = await response.json();
  
      // this wil update the refemp
      dispatch(updateRefDepartment(departmentObj));
    };
  }
  
  export function updateRefDepartment(payload) {
    return { type: REF_DEPARTMENT, payload: payload };
  }
  
  // REDUCER LOGIC
  export function DepartmentReducer(state = initState, action) {
    switch (action.type) {
      case DEPARTMENT_CREATE:
        return { ...state, list: [action.payload, ...state.list] };
      case DEPARTMENT_UPDATE:
        // TODO
        return state;
      case DEPARTMENT_DELETE:
        // TODO
        const oldList = state.list;
        oldList.splice(action.payload, 1);
        //console.log("OL", oldList);
  
        return { ...state, list: [...oldList] };
      case DEPARTMENT_GET_ALL:
        // TODO
        return state;
      case DEPARTMENT_GET_BY_ID:
        // TODO
        return state;
  
      case REF_DEPARTMENT:
        return { ...state, refemp: action.payload };

      case SERVER_ERROR:
        return { ...state, error: action.payload };
  
      default:
        return state;
    }
  }