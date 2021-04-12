import React from 'react'
import ListItem from "../components/ListItem"

class List extends React.Component {
    render(){
        var tasks = this.props.tasks;
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
                      <input className="form-control" type="text" />
                    </td>
                    <td>
                      <select className="form-control">
                        <option value={0}>Kich hoat</option>
                        <option value={1}>Chua kich hoat</option>
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