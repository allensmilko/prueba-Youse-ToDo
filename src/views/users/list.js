// CORE COMPONENTS
import React, { Component } from 'react';
import axios from 'axios';
import * as CONFIG  from '../../config';
import { Link } from 'react-router-dom';
// DOM COMPONENTS
import $ from 'jquery';
import { TweenMax, Elastic } from 'gsap';
import { ListGroup,ListGroupItem } from 'react-bootstrap';
const duration = 0.5;

class UsersList extends Component {
    
      constructor (props){
        super(props);
         this.state = {
            users: [],
            username:"",
            name:"",
            email:""
          }
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
     
    
      handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        const usernew = {
            name: this.state.name,
            username: this.state.username,
            email:this.state.email
        }
        axios.post(CONFIG.APIHOST+`users`,usernew)
          .then(res => {
           console.log(res);
            var joined = this.state.users.concat(res.data);
            this.setState({users: joined });
               console.log(this.state.users);
           
        //    this.getusers();            
          })
          .catch(err =>{
              console.error(err);
              alert("Hubo un error al cargar los datos");
          })
      }
      getusers(){
        axios.get(CONFIG.APIHOST+`users`)
        .then(res => {
          const users = res.data;
          this.setState({ users });
          
        })
        .catch(err =>{
            console.error(err);
            alert("Hubo un error al cargar los datos");
        })
       
      }
     
      componentDidMount() {
        this.getusers();    
      }
      
      
      
   alertClicked() {
    alert('You clicked the third ListGroupItem');
    }
  render() {
    return (
      <div className="UsersList container">
        <div className="row">
            <div className="col-4">
            <ListGroup>
            { this.state.users.map(user => <ListGroupItem className="userItem" data-delay={user.id} id={user.id}  key={user.id}>
                <Link to={`/user/${user.id}`}>
                    {user.name} <i className="fas fa-eye"></i>
                    </Link>
            </ListGroupItem>)}
                
                    {/* <ListGroupItem  onClick={this.alertClicked}>Trigger an alert</ListGroupItem> */} 
                </ListGroup>
            </div>
            <div className="col-8">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label >Username</label>
                    <input type="text" value={this.state.username} onChange={(e) => this.setState({ username : e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""  />
                   
                </div>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} className="form-control" id="exampleInputPassword1" placeholder="" />
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} className="form-control" id="exampleInputPassword2" placeholder="" />
                </div>
                <button type="submit" className="btn btn-primary" value="submit">Submit</button>
            </form>
            </div>
        </div>       
      </div>
    );
  }
}

export default UsersList;
