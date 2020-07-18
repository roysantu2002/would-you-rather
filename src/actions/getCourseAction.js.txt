import {firebase} from "../utils/config/firebase"

const getCourseAction = () => async dispatch => {

  console.log("Without Despatch")
    const firestore = firebase.firestore()
  firestore
    .collection("course_cat").get()
    .then(function(querySnapshot) {
      const data = querySnapshot.docs.map(doc => doc.data())
      //console.log(data)
      return data
      //dispatch({ type: "course", data: data});
    })
    .catch(function(error) {
        const errorCode = error.code
        //dispatch({ type: "course"});
      })
      return errorCode
  }

  export default getCourseAction;
  