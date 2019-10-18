import React, { Component } from "react";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

class EditTask extends Component {
  state = { ...this.props.task };

  handleChangeDate = ({ target: { id, value } }) => {
    this.setState(
      {
        [id]: value
      },
      () => {
        this.checkDate();
      }
    );
  };

  checkDate = () => {
    var today = new Date();
    var deadline = new Date(this.state.deadline);

    const result = deadline - today;
    var deadLine = "";

    if (Number(result) > 0) {
      deadLine = false;
    } else deadLine = true;

    this.setState(state => {
      return {
        isOverdue: deadLine
      };
    });
  };

  handleRadio1 = nr => () => {
    this.setState({
      isComplete: nr,
      isOverdue: false
    });
  };

  handleChangeTitle = ({ target: { id, value } }) => {
    this.setState({
      [id]: value
    });
  };

  handleDelete = e => {
    return this.props.firestore
      .collection("tasks")
      .doc(e)
      .delete()
      .then(() => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch(err => {
        console.log("Error updating doc", err);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;

    return this.props.firestore
      .collection("tasks")
      .doc(id)
      .update({
        title: this.state.title,
        deadline: this.state.deadline,
        isOverdue: this.state.isOverdue,
        isComplete: this.state.isComplete
      })
      .then(() => {
        this.props.history.push("/");
        window.location.reload();
      })
      .catch(err => {
        console.log("Error updating doc", err);
      });
  };

  handleCancel = e => {
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const { title, createdAt, isComplete, deadline } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container wide">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Edit Task</h5>
          <div className="input-field">
            <input
              type="text"
              id="title"
              value={title}
              onChange={this.handleChangeTitle}
            />
            <label className="active" htmlFor="title">
              Title
            </label>
          </div>
          <div className="input-field active">
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={this.handleChangeDate}
            />
            <label className="active" htmlFor="deadline">
              Deadline
            </label>
          </div>

          <p>
            Complete task?&nbsp;&nbsp;
            <label>
              <input
                id="isComplete1"
                checked={isComplete === true ? true : false}
                onChange={this.handleRadio1(true)}
                type="radio"
              />
              <span>Yes</span>
            </label>
            {"   "}
            <label>
              <input
                id="isComplete2"
                checked={isComplete === false ? true : false}
                onChange={this.handleRadio1(false)}
                type="radio"
              />
              <span>No</span>
            </label>
          </p>

          <p className="grey-text">
            Created: {moment(createdAt.toDate()).calendar()}
          </p>
          {/* button type must be submit when using onSubmit, leaving type blank will default to submit */}
          <div className="input-field">
            <button type="submit" className="btn blue lighten-1">
              Update
            </button>
            <button
              type="button"
              onClick={() => this.handleDelete(this.props.match.params.id)}
              className="btn red lighten-1 space"
            >
              Delete
            </button>
            <button
              onClick={this.handleCancel}
              className="btn blue lighten-1 space"
            >
              Cancel
            </button>{" "}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.tasks;
  const task = tasks ? tasks[id] : null;
  return {
    task: task,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "tasks"
    }
  ])
)(EditTask);
