
const loginAction = (email, password) => async (dispatch) => {


  console.log("we are at login")
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  // firebase
  //   .auth()
  //   .signInWithEmailAndPassword(email, password)
  //   // then() function is used to know when the async call has ended
  //   // that way, we can notify our reducers that login was succesful

  //   .then(function (user) {
  //     // if the login was succesful, then
  //     // we dispatch to our reducers the fact that
  //     // login was succesful by sending true
  //     localStorage.setItem("afterSchoolUser", user.user.uid);
  //     dispatch({ type: "login", payload: true, uid: user.user.uid });
  //   })
  //   // if the login was not succesful we can catch the erros here

  //   .catch(function (error) {
  //     // if we have any erros, we'll throw an allert with that error
  //     const errorCode = error.code;
  //     dispatch({ type: "login", payload: false, error: errorCode });
  //   });
};
export default loginAction;
