export default (state = {}, action) => {
  switch (action.type) {
    // in both cases, we want to tell our app,
    // if the user is logged in or not
    // if the user registers, he will automatically be logged in
    case "register":
      console.log("register is ", state);
      return {
        // keep old state
        ...state,
        // add true/false if the user is or not logged in
        loggedIn: action.payload,
        uid: action.uid,
        error: action.error
      };
    case "login":
      console.log("login is ", action.payload);
      return {
        // keep old state
        ...state,
        // add true/false if the user is or not logged in
        loggedIn: action.payload,
        uid: action.uid,
        error: action.error
      };

    // case "course":
    //   console.log("getCourseAction function body")
    //   console.log("login is ", action.data);
    //   return {
    //     ...state,
    //     data: action.data
    //   };
   

    default:
      return state;
  }
};
