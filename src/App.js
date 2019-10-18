import React, { Component, Fragment } from "react";
import ReactGA from "react-ga";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateTask from "./components/tasks/CreateTask";
import Navbar from "./components/layout/Navbar";
import EditTask from "./components/tasks/EditTask";
import Thankyou from "./components/tasks/Thankyou";
import Complete from "./components/tasks/Complete";
import Deadline from "./components/tasks/Deadline";
import Incomplete from "./components/tasks/Incomplete";
import Overdue from "./components/tasks/Overdue";

ReactGA.initialize("UA-148496900-1");
ReactGA.pageview("/");

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <Switch>
            <Fragment>
              <Route exact path="/" component={Dashboard} />
              <Route path="/task/:id" component={EditTask} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/thankyou" component={Thankyou} />
              <Route path="/create" component={CreateTask} />
              <Route path="/complete" component={Complete} />
              <Route path="/deadline" component={Deadline} />
              <Route path="/incomplete" component={Incomplete} />
              <Route path="/overdue" component={Overdue} />
            </Fragment>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
