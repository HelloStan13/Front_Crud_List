import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTask = this.retrieveTask.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);


    this.state = {
        id: null,
        name: "",
        responsible: "", 
  
      };
    }

  componentDidMount() {
    this.retrieveTask();
  }


  retrieveTask() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          task: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTask();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }

  render() {
    const {  task, currentTask, currentIndex } = this.state;

    return (
      <div className="list row">

        <div className="col-md-6">
          <h4>Lista de Tutoriales</h4>

          <ul className="list-group">
            {task &&
              task.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "activo" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.name}
                  {task.responsible}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Tarea:</strong>
                </label>{" "}
                {currentTask.name}
              </div>
              <div>
                <label>
                  <strong>Responsable:</strong>
                </label>{" "}
                {currentTask.responsible}
              </div>

              <Link
                to={"/task/" + currentTask.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por Favor CLICK en Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}