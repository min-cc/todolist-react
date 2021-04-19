import React from "react";
import "./App.css";
import Task from "./components/Task";
import Search from "./components/Search";
import Sort from "./components/Sort";
import List from "./components/List";
import _ from 'lodash'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //id,name,status
      isDisplayForm: false,
      taskEditing: null,
      filter : {
        name : '',
        status : -1
      },
      keyword : '',
      sort : {
        by : 'name',
        value : 1
      }
    };
  }

  componentWillMount = () => {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  };

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
    //Them task
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onSubmit = (data) => {
    var tasks = this.state.tasks;
    if (data.id === "") {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      //Editing
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    console.log(index);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });

    return result;
  };

  onUpdate = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = _.findIndex(tasks,(task)=>{
      return task.id === id
    })
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });
    this.onShowForm();
  };

  onFilter=( filterName,filterStatus )=>{
   
    filterStatus = parseInt(filterStatus,10)
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
      status : filterStatus
      }     
    })
  }

  onSearch=(keyword)=>{
    this.setState({
      keyword : keyword
    })
  }


  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword  } = this.state
    if(filter){
      if(filter.name){ //!==null 
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !==-1;
        })
      }
      tasks = tasks.filter((task)=>{
        if(filter.status ===-1){
          return task;
        }else{
          return task.status === (filter.status === 1 ? true : false)
        }
      })
      }

    if(keyword){
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !==-1;
      })
    }
    var elmTask = isDisplayForm ? (
      <Task
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    )
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
                    <Search onSearch= { this.onSearch }></Search>
                  </div>
                  <div className="col-6">
                    <br />
                    {/* Sap xep */}
                    <Sort></Sort>
                  </div>
                </div>
                {/* table */}
                <List
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                ></List>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
