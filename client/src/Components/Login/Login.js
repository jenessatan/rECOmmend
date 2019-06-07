import React, {Component} from 'react';
import {Input, Button, Form, FormGroup, Label, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import classnames from 'classnames';
import './Login.scss';

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            password:'',
            isLoggedIn: false,
            activeTab: 'consumer'
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    };

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value})
    };

    redirect = () => {
        this.context.router.history.push('/profile')
    }

    loginConsumer = () => {
        fetch(`./api/auth/consumer`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password,
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.success === true) {
                    // alert(res.message)
                    window.localStorage.setItem('user', this.state.username);
                    window.localStorage.setItem('user-type', 'consumer');
                    //console.log(window.localStorage.getItem('user'));
                    this.setState({isLoggedIn: true})
                } else {
                    alert(res.message)
                }
            })
    };

    loginBusiness = () => {
        fetch(`./api/auth/business`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password,
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.success === true) {
                    //console.log(res.message);
                    window.localStorage.setItem('user', this.state.username);
                    window.localStorage.setItem('user-type', 'business');
                    //console.log(window.localStorage.getItem('user'));
                    this.setState({isLoggedIn: true})
                } else {
                    alert(res.message)
                }
            })
    };


    render() {
        if(this.state.isLoggedIn === true || !!window.localStorage.user){
            return (<Redirect to='/profile'/>)
        } else {
            return(
                <div className='loginMainForm'>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'consumer' },'consumer')}
                      onClick={() => { this.toggle('consumer'); }}
                    >
                      Consumer Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'business' }, 'business')}
                      onClick={() => { this.toggle('business'); }}
                    >
                      Business Login
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="consumer" className='consumerTab'>
                  <Form className='loginForm'>
                     <FormGroup>
                     <Label for="exampleEmail" >Email</Label>
                     <Input type="email" name="email" id="exampleEmail" placeholder="Email"
                           onChange={this.handleUsernameChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password"
                           onChange={this.handlePasswordChange} />
                </FormGroup>
                    <Button onClick={this.loginConsumer}>Submit</Button>
                    </Form>
                  </TabPane>
                  <TabPane tabId="business" className='businessTab'>
                  <Form className='loginForm'>
                     <FormGroup>
                     <Label for="exampleEmail" >Email</Label>
                     <Input type="email" name="email" id="exampleEmail" placeholder="Email"
                           onChange={this.handleUsernameChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password"
                           onChange={this.handlePasswordChange} />
                </FormGroup>
                    <Button onClick={this.loginBusiness}>Submit</Button>
                    </Form>
                  </TabPane>
                </TabContent>
              </div>
            // <Form inline>
            //     <FormGroup>
            //         <Label for="exampleEmail" hidden>Email</Label>
            //         <Input type="email" name="email" id="exampleEmail" placeholder="Email"
            //                onChange={this.handleUsernameChange} />
            //     </FormGroup>
            //     {' '}
            //     <FormGroup>
            //         <Label for="examplePassword" hidden>Password</Label>
            //         <Input type="password" name="password" id="examplePassword" placeholder="Password"
            //                onChange={this.handlePasswordChange} />
            //     </FormGroup>
            //     {' '}
            //     <Button onClick={this.login}>Submit</Button>
            // </Form>
        )}
    }
}

export default Login;
