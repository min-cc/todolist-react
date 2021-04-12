import React from 'react';

class Sort extends React.Component {
    render(){
        return(
            <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-primary dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Sap xep
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                      <p class="dropdown-item">Tu A-Z</p>
                      <p class="dropdown-item">Tu Z-A</p>
                    </div>
                  </div>
        )
    }
}

export default Sort;