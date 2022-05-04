import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/api/task" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/api/task"} className="nav-link">
                Task
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/api/task"} className="nav-link">
                Add Task
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/api/task"]} component={TaskList} />
            <Route exact path="/add" component={AddTask} />
            <Route path="//api/task/:id" component={Task} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;