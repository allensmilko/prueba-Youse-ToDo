// CORE COMPONENTS
import React, { Component } from 'react';
import axios from 'axios';
import * as CONFIG  from '../../config';
import { Link } from 'react-router-dom';
// DOM COMPONENTS
import UserData from '../../components/users/detail';
import TodoItem from '../../components/todo/usertodo';


class UserDetail extends Component {
    state = {
        user: {},
        todos:[]
      }
      componentDidMount() {
        const { match: { params } } = this.props;
        axios.get(CONFIG.APIHOST+`users/${params.id}`)
          .then(res => {
            const user = res.data;
            this.setState({ user });
          })
          .catch(err =>{
            console.error(err);
            alert("Hubo un error al cargar los datos");
        })
            axios.get(CONFIG.APIHOST+`todos?userId=${params.id}`)
              .then(res => {
                const todos = res.data;
                for(var i = 0; i < todos.length ; i++){
                    todos[i].editing=false;
                     todos[i].tileprov = "";
                }
                console.log(todos);
                this.setState({ todos });
              })
              .catch(err =>{
                console.error(err);
                alert("Hubo un error al cargar los datos");
            })
          
      }
      enableEdit(todo){
        console.log("On edit");
        console.log(todo);
        for (var i = this.state.todos.length - 1; i >= 0; i--) {
          if (this.state.todos[i].id==todo.id) {
              this.state.todos[i].editing = !this.state.todos[i].editing;
          }
        }
        this.setState({todos:this.state.todos});
      }
      editingTodo(todo){
        console.log("On edit");
        console.log(todo)
        for (var i = this.state.todos.length - 1; i >= 0; i--) {
          if (this.state.todos[i].id==todo.id) {
              this.state.todos[i].title = todo.tileprov;
          }
        }
        this.setState({todos:this.state.todos});
      }
      complete(todo){
         for (var i = this.state.todos.length - 1; i >= 0; i--) {
          if (this.state.todos[i].id==todo.id) {
              this.state.todos[i].completed = true;
          }
        }
        this.setState({todos:this.state.todos});
          axios.put(CONFIG.APIHOST+`todos/${todo.id}`)
          .then(res => {
            console.log(res);
          })
          .catch(err =>{
            console.error(err);
            alert("Hubo un error al cargar los datos");
        })
      }
      deleteTodo(todo){
          axios.delete(CONFIG.APIHOST+`todos/${todo.id}`)
          .then(res => {
            console.log(res);
             var removeIndex = this.state.todos.map(function(todo) { return todo.id; }).indexOf(todo.id);
              this.state.todos.splice(removeIndex, 1);
              this.setState({todos:this.state.todos});
          })
          .catch(err =>{
            console.error(err);
            alert("Hubo un error al cargar los datos");
        })
      }
      
  render() {
    return (
      <div className="UsersList container">
        <div className="row">
        <div>
        <Link to={`/`}>
            <h2>Volver</h2>
        </Link>
        </div>
            <UserData  name={this.state.user.name} username={this.state.user.username} email={this.state.user.email} website={this.state.user.website} ></UserData>
        </div> 
        { this.state.todos.map(todo => <TodoItem key={todo.id} enableEdit={(todo)=>this.enableEdit(todo)} deleteTodo={(todo)=>this.deleteTodo(todo)} complete={(todo)=>this.complete(todo)}  editingTodo={(todo)=>this.editingTodo(todo)} id={todo.id} title={todo.title} editing={todo.editing} completed={todo.completed}></TodoItem>)}
             
      </div>
    );
  }
}

export default UserDetail;
