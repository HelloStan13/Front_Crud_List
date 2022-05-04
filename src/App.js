import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import './components/task.component';
import './components/task_list.component';
import './components/add_task.components'
import { Switch, Route, Link } from "react-router-dom";
import TaskList from './components/task_list.component';


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/task/"} className="navbar-brand">
            Tareas
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={""} className="nav-link">
                Tareas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={""} className="nav-link">
                Nueva Tarea
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
          <Route path="http://localhost:9090/api" element={<TaskList/>} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;