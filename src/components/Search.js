import React from 'react';

class Search extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        keyword : ''
      }
    }

    onChange=(event)=>{
      var target  = event.target
      var name = target.name
      var value = target.value;
      this.setState({
        [name] : value
      })
    }

    onSearch=()=>{
      this.props.onSearch(this.state.keyword)
    }

    render(){
        var { keyword } = this.state
        return(
            <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhap tu khoa...."
                      value = { keyword }
                      onChange= { this.onChange }
                      name="keyword"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button"
                      onClick= { this.onSearch }>
                        Tim
                      </button>
                    </div>
                  </div>
        )
    }
}

export default Search;