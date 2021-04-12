import React from 'react'

class ListItem extends React.Component {

  onUpdateStatus=()=>{
    this.props.onUpdateStatus(this.props.task.id)
  }

  onDelete = ()=>{
    this.props.onDelete(this.props.task.id)
  }

  onUpdate = ()=>{
    this.props.onUpdate(this.props.task.id)
  }

    render(){
        var { task, index } = this.props;

        

        return(
            <tr>
                    <th scope="row">{ index + 1 }</th>
                    <td>{ task.name } </td>
                    <td className="text-center">
                    <span 
                    className= { task.status ? 'badge badge-success' : 'badge badge-secondary' } 
                    onClick= {this.onUpdateStatus }
                    >{ task.status ===true ? "Kich hoat" : "Chua kich hoat"}
                  </span>
                     </td>
                    <td>
                      <button
                        type="update"
                        className="btn btn-warning text-white"
                        onClick= { this.onUpdate }
                      >
                        Sua
                      </button>
                      &nbsp;
                      <button 
                      type="delete" 
                      className="btn btn-danger"
                      onClick= { this.onDelete }>
                        Xoa
                      </button>
                    </td>
                  </tr>
        )
    }
}

export default ListItem;