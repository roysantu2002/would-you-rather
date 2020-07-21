export default (state = {}, action) => {

  switch (action.type) {
 
    case "register":
      return {
        ...state,
        loggedIn: action.payload,
      };
    case "login":
    
      return {
        ...state,
        loggedIn: action.payload,
      };

    default:
      return {
        ...state,
        loggedIn: false,
      };
  }
};
