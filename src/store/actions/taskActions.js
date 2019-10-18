export const createTask = task => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    // console.log(authorId);
    // var today = new Date();
    // if (task.deadline < today.toLocaleDateString()) {
    //   task.isOverdue = true;
    // }
    firestore
      .collection("tasks")
      .add({
        ...task,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_TASK_SUCCESS", task });
        console.log(task);
      })
      .catch(err => {
        dispatch({ type: "CREATE_TASK_ERROR" }, err);
      });
  };
};



