// CORE COMPONENTS
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// DOM COMPONENTS
import { Button ,Badge } from 'react-bootstrap';


class TodoItem extends React.Component  {

    editar(){
        // this.props.editing=true;
    }
    render(){
        return (
            <div className="UsersList container">
              <div className="row">
                  <div className="col-2 text-left">
                      <p>{this.props.id}  { this.props.completed ? <span className="badge badge-success float-right">Completado</span> : <span className="badge badge-danger float-right">Por completar</span> }</p>
                  </div>
                  <div className="col-6 text-left">
                     { !this.props.editing ?  <p><b>{this.props.title}</b></p> :
                      <input />}
                  </div>
                  <div className="col-1">
                  <Button bsStyle="info" onClick={this.editar()} >Editar</Button>
                  </div>
                  <div className="col-1">
                  <Button bsStyle="danger">Borrar</Button>
                  </div>
                  <div className="col-1">
                  { !this.props.completed ?  <Button bsStyle="success">Completar</Button> : null }
                  </div>
              </div>       
            </div>
          );
    }
    
};
// TodoItem.propTypes = {
//     title: PropTypes.string,
//     completed:PropTypes.bool,
//     id: PropTypes.number,
//     editing:PropTypes.bool
// }

export default TodoItem;
