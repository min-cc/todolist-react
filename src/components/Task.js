import React from 'react';
// import "./App.css";

class Task extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id : '',
      name : '',
      status : false
    }
  }

  componentWillMount(){
    if (this.props.task){
      this.setState({
        id : this.props.task.id,
        name : this.props.task.name,
        status : this.props.task.status
      })

    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps && nextProps.task){
      this.setState({
        id : nextProps.task.id,
        name : nextProps.task.name,
        status : nextProps.task.status
      })

    }else if(!nextProps.task){
      this.setState({
        id : '',
      name : '',
      status : false
      })
    }
  }

  onCloseForm = () =>{
    this.props.onCloseForm()
  }

  onChange=(event) =>{
    var target = event.target
    var name = target.name
    var value = target.value
    if(name === 'status'){
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name] : value
    })
  }

  onSubmit= (event)=>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    //cancel & close form
    this.onClear();
    // this.onCloseForm();
  }

  onClear=()=>{
    this.setState({
      id : '',
      name : '',
      status : false
    })
  }

 

  render(){
    var { id } = this.state 
    return (
      <div className=" bg-white border border-success rounded rounded-2">
        <div className="panel-title p-3 text-white bg-success d-flex">
        <h5>{ id !==''? 'Cap Nhap Cong Viec' : 'Them Cong Viec'} </h5>
        <span className="fa fa-times-circle ml-auto" aria-hidden="true"
        onClick= { this.onCloseForm }></span>
        </div>
        <div className=" bg-white d-flex">
          <div className="container">
            <form onSubmit= { this.onSubmit }>
              <div className="form-group">
              <br/>
                <label>Ten :</label>
                <input 
                type="text" 
                class="form-control"
                name="name"
                value= {this.state.name}
                onChange= {this.onChange} />
                <br />
                <label>Trang Thai :</label>
                <br />
                <select 
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.onChange}>
                  <option value={true}>Kich hoat</option>
                  <option value={false}>Chua kich hoat</option>
                </select>
              </div>
              <br />
              <div className="">
                <button type="submit"  class="btn btn-primary">
                  Luu lai
                </button>
                &nbsp;
                <button 
                type="reset" 
                class="btn btn-danger"
                onClick={ this.onClear }>
                  Xoa
                </button>
              </div>

              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    
    );
  }
  
}

export default Task;
