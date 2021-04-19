import React from 'react'
import ListItem from "../components/ListItem"

class List extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        filterName : '',
        filterStatus : -1 //all:-1 kich hoat :1 chua kich hoat : 0

      }
    }

    onChange=(event)=>{
      var target=event.target;
      var name = target.name;
      var value = target.value;
      this.props.onFilter(
        name === 'filterName'? value : this.state.filterName,
        name === 'filterStatus'? value : this.state.filterStatus)
      this.setState({
        [name] : value
      })
    }

    render(){

        var tasks = this.props.tasks;
        var { filterName, filterStatus } = this.state

        var elmTasks = tasks.map ((task,index) =>{
            return <ListItem 
            key={task.id} 
            index={index} 
            task={task}
            onUpdateStatus = { this.props.onUpdateStatus}
            onDelete = { this.props.onDelete }
            onUpdate = { this.props.onUpdate }
            />
        });
        return(
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Ten</th>
                    <th scope="col">Trang thai</th>
                    <th scope="col">Hanh dong</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"></th>
                    <td>
                      <input 
                      className="form-control" 
                      type="text" 
                      name="filterName"
                      value= { filterName }
                      onChange = { this.onChange }
                      />
                    </td>
                    <td>
                      <select className="form-control" 
                      name="filterStatus"
                      value= { filterStatus }
                      onChange = { this.onChange }>
                        <option value={-1}>Tat Ca</option>
                        <option value={1}>Kich Hoat</option>
                        <option value={0}>Chua Kich Hoat</option>
                      </select>
                    </td>
                    <td></td>
                  </tr>
                  { elmTasks }
                  
                </tbody>
                <hr />
              </table>
        )
    }
}

export default List;