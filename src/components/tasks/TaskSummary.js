import React, { Component } from "react";
import moment from "moment";

class TaskSummary extends Component {
  state = { ...this.props.task };

  render() {
    const { task } = this.props;
    
    let today = new Date();
    let deadline = new Date(this.state.deadline);

    const result = deadline - today;
    let deadLine = false;

    if (Number(result) > 0) {
      deadLine = false;
    } else deadLine = true;
    console.log(result);
    console.log(deadLine);
    task.isOverdue = deadLine;
    if (task.isComplete === true) task.isOverdue = false;

    let overdue = "";
    if (task.isOverdue === true) {
      overdue = "Task is incomplete and overdue!";
    } else if (task.isComplete === true) {
      overdue = "Task is complete.";
    } else overdue = "Task is incomplete but not overdue.";

    today = today.toLocaleDateString();
    deadline = deadline.toLocaleDateString();

    return (
      <div className="card z-depth-0 wide">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">{task.title}</span>
          <p className="grey-text">
            Created: {moment(task.createdAt.toDate()).calendar()}
          </p>
          <p>Deadline: {deadline}</p>

          <p>Today's date: {today}</p>
          <p>
            Tasker: {task.authorFirstName} {task.authorLastName}
          </p>

          <p className=" pink-text">{overdue}</p>
        </div>
      </div>
    );
  }
}

export default TaskSummary;
