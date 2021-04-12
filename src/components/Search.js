import React from 'react';

class Search extends React.Component {
    render(){
        return(
            <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhap tu khoa...."
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        Tim
                      </button>
                    </div>
                  </div>
        )
    }
}

export default Search;