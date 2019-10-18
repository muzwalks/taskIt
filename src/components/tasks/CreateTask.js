import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../../store/actions/taskActions";
import { Redirect } from "react-router-dom";

class CreateTask extends Component {
  state = {
    title: "",
    deadline: "",
    isOverdue: false,
    isComplete: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

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

  handleSubmit = e => {
    e.preventDefault();

    this.props.createTask(this.state);
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container wide">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Task</h5>

          <div className="input-field">
            <input type="text" id="title" onChange={this.handleChange} />
            <label htmlFor="title">Title</label>
          </div>

          <div className="input-field">
            <input
              type="date"
              id="deadline"
              value={this.state.deadline}
              onChange={this.handleChangeDate}
            />
            <label htmlFor="deadline">Deadline</label>
          </div>

          <div className="input-field">
            <button className="btn blue lighten-1">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTask: task => dispatch(createTask(task))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTask);
