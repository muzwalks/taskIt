import React, { Component } from "react";
import M from "materialize-css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

class SignedInLinks extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div>
        <ul className="right">
          <li>
            <a
              className="dropdown-trigger btn"
              href="#"
              data-target="dropdown1"
            >
              Query
            </a>

            <ul id="dropdown1" className="dropdown-content">
              <li>
                <NavLink to="/deadline">Deadline</NavLink>
              </li>
              <li>
                <NavLink to="/complete">Complete</NavLink>
              </li>

              <li>
                <NavLink to="/incomplete">Incomplete</NavLink>
              </li>
              <li>
                <NavLink to="/overdue">Overdue</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <ul className="right">
              <li>
                <NavLink to="/create">CREATE TASK</NavLink>
              </li>
              <li>
                <a onClick={this.props.signOut}>LOG OUT</a>
              </li>
              <li>
                <NavLink to="/" className="btn btn-floating ">
                  {this.props.profile.initials}
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
