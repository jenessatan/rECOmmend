import React, { Component } from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	static defaultProps = {
            name: '',
            email: '',
            password: '',
    }
	
	state = {
			name: this.props.name,
			email: this.props.email,
			password: this.props.password
		}
	
	// This makes email uneditable	
	// static getDerivedStateFromProps(nextProps, prevState){
	//	if (nextProps.dummyProp !== prevState.email) {
	//		return nextProps;
	//	} else {
	//		return nextProps;
	//	}
	// }
	
	componentDidUpdate(props, state, snapshot) {
    	if (this.props.email !== props.email) {
      	this.setState({email: this.props.email});
    	}
    	if (this.props.name !== props.name){
    		this.setState({name: this.props.name});
    	}
    	if (this.props.password !== props.password) {
    		this.setState({password: this.props.password});
    	}
  	}
	
	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}
	
	handleNameChange(event) {
		this.setState({name: event.target.value});
	}
	
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}
	
  	handleSubmit(event) {
  		fetch('http://localhost:5000/api/account/CID1', {
  			headers: {
  				'content-type': 'application/json'},
  			body: JSON.stringify({
  				'email': this.state.email,
  				'name': this.state.name,
  				'password': this.state.password
  				}),
  			method: 'PATCH'
  		})
  		.then(res => res.json())
  		.then(data => {
  			if (data.error) {
  				throw new Error(data.error);
  			}
  		})
  		.catch(error => {
  			alert(`Unable to update profile: ${error}`);
  		})	
  	}

    render() {
    	return(
    	<Container>
    	<Row className="justify-content-around">
    	<Col sm="9" className="align-middle">
        <Form>
        	<FormGroup row>
          		<Label for="name" sm={3}>Name</Label>
          		<Col sm={9}>
            	<Input type="text" name="name" id="name" onChange={this.handleNameChange.bind(this)} value={this.state.name}/>
          		</Col>
        	</FormGroup>
        	<FormGroup row>
          		<Label for="name" sm={3}>Email</Label>
          		<Col sm={9}>
            	<Input type="text" name="email" id="email" onChange={this.handleEmailChange.bind(this)} value={this.state.email}/>
          		</Col>
        	</FormGroup>
        	<FormGroup row style={{marginBottom: 0}}>
          		<Label for="password" sm={3}>Password</Label>
          		<Col sm={9}>
            	<Input type="text" name="password" id="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password}/>
          		</Col>
        	</FormGroup>
        </Form>	
        </Col>
        <Col className="align-self-center text-center" sm="3">
        	<Button className="btn-lg" onClick={this.handleSubmit.bind(this)} style={{margin: 0}}>Update</Button>
        </Col>
        </Row>
        </Container>
    )
}
}

// this.window.localstorage.user
export default UserInfo;
