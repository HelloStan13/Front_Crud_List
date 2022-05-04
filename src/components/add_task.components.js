import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);
  

    this.state = {
      id: null,
      name: "",
      responsible: "", 

    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeResponsible(e) {
    this.setState({
      responsible: e.target.value
    });
  }

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          responsible: response.data.responsible,

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      name: "",
      responsible: "",

    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Operacion Existosa!</h4>
            <button className="btn btn-success" onClick={this.newTask}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="responsible"
                required
                value={this.state.responsible}
                onChange={this.onChangeResponsible}
                name="resposible"
              />
            </div>

            <button onClick={this.saveTask} className="btn btn-success">
              Registrar
            </button>
          </div>
        )}
      </div>
    );
  }
}