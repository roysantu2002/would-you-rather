import * as dataApi from "../utils/_DATA";

const registerAction = (id) => async (dispatch) => {
  const user = `${id}: {
        id: '${id}',
        name: '${id}',
        avatarURL: "",
        answers: {},
        questions: []
      },`;

  // const data = await dataApi._addUser(user);
  // const da = await dataApi._getUsers();
  // console.log("Get Data")
  
};
export default registerAction;
