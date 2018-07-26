import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UsersList from './views/users/list';
import UserDetail from './views/users/detail';
import { library } from '@fortawesome/fontawesome-svg-core'


class App extends Component {
  render() {
    return (
<Router>
      <div className="App">
        <header className="App-header">
        <Link to={`/`}>
          <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h1 className="App-title">Youse ToDo</h1>
        </header>
        <div>
          
            <Route exact path="/" component={UsersList}></Route>
            <Route exact path="/user/:id" component={UserDetail}></Route>
        
          
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
