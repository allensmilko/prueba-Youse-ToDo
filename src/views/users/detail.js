// CORE COMPONENTS
import React, { Component } from 'react';
import axios from 'axios';
import * as CONFIG  from '../../config';
import { Link } from 'react-router-dom';
// DOM COMPONENTS
import $ from 'jquery';
import { TweenMax, Elastic } from 'gsap';
import UserData from '../../components/users/detail';
import TodoItem from '../../components/todo/usertodo';
import { Button,Modal,OverlayTrigger } from 'react-bootstrap';

class UserDetail extends Component {
   constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
        user: {},
        todos:[],
        show: false,
        panelactive:false,
        userId:this.props.match.params.id,
        newtask:""
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        const newtodo = {
            title: this.state.newtask,
            userId: this.state.userId
        }
        axios.post(CONFIG.APIHOST+`todos`,newtodo)
          .then(res => {
           console.log(res);
           res.data.title=newtodo.title;
           res.data.completed = false;
           res.data.titleprov="";

            var joined = this.state.todos.concat(res.data);
            this.setState({todos: joined });
               console.log(this.state.todos);
               this.showhide();           
          })
          .catch(err =>{
              console.error(err);
              alert("Hubo un error al cargar los datos");
          })
      }
      handleClose() {
        console.log(this.state.userId)
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
      componentDidMount() {
        console.log(this.state.userId);
        this.showhide();
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
        console.log(todo);
        for (var i = this.state.todos.length - 1; i >= 0; i--) {
          // if (this.state.todos[i].id==id) {
          //     this.state.todos[i].title = todo;
          //     console.log(this.state.todos[i].title);
          //     console.log(todo);
          // }
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
      
      activenew(){
          return TweenMax
          .to('.newTodo',.8,{             
              minHeight:150,
              ease: Elastic.easeInOut.config(0.25,1),
          })          
      }
     
      activemenuform(){
        TweenMax
                  .to('.newform',.8,{             
                      marginLeft: '0%',
                      delay:.8,
                      ease: Elastic.easeInOut.config(0.25,1),
                  })
      }
       inactivemenupanel(){
          return TweenMax
          .to('.newTodo',.8,{             
              height: 0,
              minHeight:0,
              delay:1,
              ease: Elastic.easeInOut.config(0.25,1),
          })          
      }
      inactiveMenu(){   
      console.log("Inactive menu");     
        return TweenMax
          .to('.newform',.8,{             
              marginLeft:'-100%',
              ease: Elastic.easeInOut.config(0.25,1),
          })
      }
      showhide=()=>{
        console.log("A punto de animar");
        if (this.state.panelactive===true) {
          console.log("Estan activos");
          this.activenew();
          this.activemenuform();          
          this.setState({panelactive:false})
        }
        else{
          console.log("Estan inactivos");
          this.inactivemenupanel();
          this.inactiveMenu();
          this.setState({panelactive:true})
        }
      }
  render() {
    return (
      <div className="UsersList container">
        <div className="row">
        <div className="col-12 text-left" >
        <Link to={`/`}>
            <h2>  <i className="fas fa-chevron-left"></i> Volver</h2>
        </Link>
        </div>
        <div className="col-12">
            <UserData  name={this.state.user.name} username={this.state.user.username} email={this.state.user.email} website={this.state.user.website} ></UserData>
        </div> 
        <div className="col-12 text-right">
        {this.state.panelactive ? 
         <Button bsStyle="success" onClick={this.showhide}>Nueva tarea</Button> :
         <Button bsStyle="danger" onClick={this.showhide}>Cancelar</Button>
       }
          
        </div>
        <div className="col-12 newTodo ">
           <form onSubmit={this.handleSubmit} className="newform">
                
                <div className="form-group">
                    <label >Tarea</label>
                    <input type="text" onChange={(e) => this.setState({ newtask : e.target.value })} value={this.state.newtask} className="form-control" id="exampleInputPassword2" placeholder="" />
                </div>
                <button type="submit" className="btn btn-primary" value="submit">Submit</button>
            </form>
           
        </div> 
        <div className="col-12">
        { this.state.todos.map(todo => <TodoItem key={todo.id} enableEdit={(todo)=>this.enableEdit(todo)} deleteTodo={(todo)=>this.deleteTodo(todo)} complete={(todo)=>this.complete(todo)}  editingTodo={(todo)=>this.editingTodo(todo)} id={todo.id} title={todo.title} titleprov={todo.titleprov} editing={todo.editing} completed={todo.completed}></TodoItem>)}
           </div>  
      </div>
      </div>
    );
  }
}

export default UserDetail;
