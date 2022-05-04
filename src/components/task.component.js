import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);
    this.getTask = this.getTask.bind(this);

    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);


    this.state = {
        id: null,
        name: "",
        responsible: "", 
  
      };
    }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          name: name
        }
      };
    });
  }

  onChangeResponsible(e) {
    const responsible = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        responsible: responsible
      }
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask(status) {
    var data = {
      id: this.state.currentTask.id,
      name: this.state.currentTask.name,
      responsible: this.state.currentTask.responsible,

    };

    TutorialDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
            currentTask: {
            ...prevState.currentTask,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "El tutorial se actualizo con EXITO!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/task')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Estado:</strong>
                </label>
                {currentTutorial.published ? "Publicado" : "Pendiente"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                No-Publicado
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publicado
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Borrar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Porfavor presione CLICK en Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}