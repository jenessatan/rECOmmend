import React, {Component} from 'react';
import {Input, Button, Form, FormGroup, Label} from 'reactstrap';
import {Redirect} from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            password:'',
            isLoggedIn: false
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

    login = () => {
        fetch(`./api/auth`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if(res.success === true) {
                    // alert(res.message)
                    window.localStorage.setItem('user', this.state.username);
                    console.log(window.localStorage.getItem('user'));
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
            <Form inline>
                <FormGroup>
                    <Label for="exampleEmail" hidden>Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email"
                           onChange={this.handleUsernameChange} />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="examplePassword" hidden>Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password"
                           onChange={this.handlePasswordChange} />
                </FormGroup>
                {' '}
                <Button onClick={this.login}>Submit</Button>
            </Form>
                )}
    }
}

export default Login;
