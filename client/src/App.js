import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';

import './App.scss'
import LandingPage from './Pages/LandingPage';
import ProfilePage from './Pages/ProfilePage';
import Header from './Components/NavigationBar/Header.js';
import ProductsPage from './Pages/ProductsPage';
import LoginPage from './Pages/LoginPage'

class App extends Component {
  constructor() {
    super();

    this.state={
      isLoggedIn: false
    }
  }

  render(){
    return (
      <Router>
        <Header />
        <Route path='/' exact strict component={LandingPage}/>
        <Route path='/profile' exact strict component={ProfilePage}/>
        <Route path='/products' exact strict component={ProductsPage} />
        <Route path='/business' exact strict component={ProductsPage} />
        <Route path='/login' exact component={LoginPage} />
      </Router>
    )
  }
}


export default App;
