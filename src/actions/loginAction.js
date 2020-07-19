// import data from "../data/users.json";

import * as dataApi from "../utils/_DATA";


const loginAction = (id) => async (dispatch) => {
  let users = [];
  let isFound = false;

  const data = await dataApi._getUsers();
  users = data;

  const usersId = Object.keys(users);
  isFound = usersId.includes(id);

  console.log(`Found : ${isFound}`);

  if (isFound) {
    dispatch({ type: "login", payload: true });
  } else {
    dispatch({ type: "login", payload: false });
  }

  // console.log(isFound);
};
export default loginAction;
