import React, { Component } from "react";

import TaskList from "../tasks/TaskList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Overdue extends Component {
  render() {
    const { tasks, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container wide drop">
        <TaskList tasks={tasks} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);

  return {
    tasks: state.firestore.ordered.tasks,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "tasks", where: ["isOverdue", "==", true] }
  ])
)(Overdue);
