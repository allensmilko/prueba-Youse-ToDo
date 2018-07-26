// CORE COMPONENTS
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// DOM COMPONENTS
import { Button ,Badge } from 'react-bootstrap';


class TodoItem extends React.Component  {

  
    render(){
        return (
            <div className="UsersList container">
              <div className="row">
                  <div className="col-2 text-left">
                      <p>{this.props.id}  { this.props.completed ? <span className="badge badge-success float-right">Completado</span> : <span className="badge badge-danger float-right">Por completar</span> }</p>
                  </div>
                  <div className="col-6 text-left">
                     { !this.props.editing ?  <p><b>{this.props.title}</b></p> :
                     <div>
                     <input  value={this.props.title} onChange={(e) => this.props.editingTodo(this.props)} />
                     </div>
                      }
                  </div>
                  <div className="col-1">
                 { !this.props.editing ? <Button bsStyle="info" onClick={()=>this.props.enableEdit(this.props)} >Editar</Button>:
                  <Button bsStyle="success" onClick={()=>this.props.enableEdit(this.props)} >aceptar</Button>}
                  </div>
                  <div className="col-1">
                  <Button bsStyle="danger" onClick={()=>this.props.deleteTodo(this.props)}>Borrar</Button>
                  </div>
                  <div className="col-1">
                  { !this.props.completed ?  <Button bsStyle="success" onClick={()=>this.props.complete(this.props)}>Completar</Button> : null }
                  </div>
              </div>       
            </div>
          );
    }
    
};


export default TodoItem;
