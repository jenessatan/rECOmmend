import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import ProfilePage from './Pages/ProfilePage';
import Header from './Components/NavigationBar/Header.js';
import ProductsPage from './Pages/ProductsPage';
import BusinessPage from './Pages/BusinessPage';
import LoginPage from './Pages/LoginPage';
import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state={
      isLoggedIn: false,
      user: ''
    }
  }

  onComponentDidMount(){
    this.setState({user: window.localStorage.getItem('user')});
  }

  render(){
    return (
      <Router>
        <Header />
        <Route path='/' exact strict component={LandingPage}/>
        <Route path='/profile' exact strict render={() =>
          !window.localStorage.user? (<Redirect to='/login'/>):(<ProfilePage/>)}/>
        <Route path='/products' exact strict component={ProductsPage} />
        <Route path='/business' exact strict component={BusinessPage} />
        <Route path='/login' exact strict component={LoginPage} />
      </Router>
    )
  }
}

export default App;
