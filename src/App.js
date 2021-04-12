import React from "react";
import "./App.css";
import Task from "./components/Task";
import Search from "./components/Search";
import Sort from "./components/Sort";
import List from "./components/List";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //id,name,status
      isDisplayForm: false,
      taskEditing : null
    };
  }

  componentWillMount= ()=> {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: this.generateID(),
  //       name: "hoc lap trinh",
  //       status: true,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "di choi",
  //       status: false,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "di an",
  //       status: true,
  //     },
  //   ];

  //   this.setState({
  //     tasks: tasks,
  //   });
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateID() {
    return (
      this.s4() + this.s4() + "-" + this.s4() + this.s4() + "-" + this.s4()
    );
  }

  onClicked = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };

  onCloseForm=()=>{
    this.setState({
      isDisplayForm: false
    })
  }

  onShowForm=()=>{
    this.setState({
      isDisplayForm: true
    })
  }

  onSubmit =(data)=>{
    var  tasks  = this.state.tasks;
      if(data.id === ''){
        data.id = this.generateID();
        tasks.push(data);
      }else{
        //Editing
        var index = this.findIndex(data.id);
        tasks[index] = data
      }
      this.setState({
        tasks : tasks,
        taskEditing : null
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    onUpdateStatus=(id)=>{
        var { tasks } = this.state
        var index = this.findIndex(id)
        console.log(index)
        if(index !== -1){
          tasks[index].status = !tasks[index].status
          this.setState({
            tasks : tasks
          })
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onDelete=(id)=>{
      var { tasks } = this.state
        var index = this.findIndex(id)
        if(index !== -1){
          tasks.splice(index, 1)
          this.setState({
            tasks : tasks
          })
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
      var { tasks } = this.state
      var result = -1
      tasks.forEach((task,index)=>{
        if(task.id === id){
          result = index
        }
      });
      return result
    }

    onUpdate=(id)=>{
      var { tasks } = this.state
        var index = this.findIndex(id)
        var taskEditing = tasks[index];
        this.setState({
          taskEditing : taskEditing
        })
        this.onShowForm()
    }


  render() {
    var { tasks, isDisplayForm, taskEditing } = this.state;
    var elmTask = isDisplayForm 
    ? <Task 
    onSubmit={this.onSubmit} 
    onCloseForm={this.onCloseForm}
    task = { taskEditing }
    /> : "";
    return (
      <div>
        <br />
        <h1 className="text-center">To Do List</h1>
        <hr />
        <div className="container">
          <div className="row">
            <br />
            {/* Form */}
            <div className={isDisplayForm ? "col-4" : ""}>{elmTask}</div>

            <div className={isDisplayForm ? "col-8" : "col-12"}>
              <div className="container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onClicked}
                >
                  <span className="fa fa-plus mr-2"></span>Them Cong Viec
                </button>
                &nbsp;
                {/* <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onGenerateData}
                >
                  Generate Data
                </button> */}
                <br />
                <div className="row">
                  <div className="col-6">
                    <br />
                    {/* Tim kiem */}
                    <Search></Search>
                  </div>
                  <div className="col-6">
                    <br />
                    {/* Sap xep */}
                    <Sort></Sort>
                  </div>
                </div>
                {/* table */}
                <List tasks={tasks} onUpdateStatus={ this.onUpdateStatus} onDelete= { this.onDelete } onUpdate= { this.onUpdate }></List>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
