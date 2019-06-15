import React, { Component } from 'react';
import { Alert, Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row, UncontrolledAlert } from 'reactstrap';

class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dismissUnsuccessfulAlert = this.dismissUnsuccessfulAlert.bind(this);
		this.dismissSuccessfulAlert = this.dismissSuccessfulAlert.bind(this);
	}
	
	static defaultProps = {
            name: 'placeholder',
            email: 'placeholder',
            password: 'placeholder',
            showSuccessfulAlert: false,
            showUnsuccessfulAlert: false,
    }
	
	state = {
			name: this.props.name,
			nameError: false,
			email: this.props.email,
			emailError: false,
			password: this.props.password,
			passwordError: false,
			showSuccessfulAlert: false,
			showUnsuccessfulAlert: false,
			unsuccessfulAlertMessage: null
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
  	
  	dismissSuccessfulAlert() {
  		this.setState({showSuccessfulAlert: false});
  	}
  	
  	dismissUnsuccessfulAlert() {
  		this.setState({showSuccessfulAlert: false});
  		this.setState({unsuccessfulAlertMessage: ''});
  	}
		
	handleEmailChange(event) {
		const emailRule = /\S+@\S+\.\S+/g;
		this.setState({email: event.target.value});
		!emailRule.test(event.target.value) ? 
		this.setState({emailError: true}) :
		this.setState({emailError: false});
	}
	
	handleNameChange(event) {
		this.setState({name: event.target.value});
		event.target.value.length < 1 ?
		this.setState({nameError: true}) :
		this.setState({nameError: false});
			
	}
	
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
		event.target.value.length < 1 ?
		this.setState({passwordError: true}) :
		this.setState({passwordError: false});
	}
	
  	handleSubmit(event) {
  		fetch(`./api/account/${window.localStorage.getItem('user-id')}`, {
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
  			else {
  				this.setState({showSuccessfulAlert: true});
  			}
  		})
  		.catch(error => {
  			this.setState({unsuccessfulAlertMessage: error.message,
  						   showUnsuccessfulAlert: true});
  		})	
  	}

    render() {
    	return(
    	<Container>
    	<Row className="justify-content-around">
    	<Col sm="12">
    		<Alert color="danger" isOpen={this.state.showUnsuccessfulAlert}>
    			Unable to update account: {this.state.unsuccessfulAlertMessage}
    		</Alert>
    		<Alert color="success" isOpen={this.state.showSuccessfulAlert} toggle={this.dismissSuccessfulAlert}>
    			Account successfully updated.
    		</Alert>
    	</Col>
    	<Col sm="9" className="align-middle">
        <Form>
        	<FormGroup row>
          		<Label for="name" sm={3}>Name</Label>
          		<Col sm={9}>
            	<Input invalid={this.state.nameError} type="text" name="name" id="name" onChange={this.handleNameChange.bind(this)} value={this.state.name} />
            	<FormFeedback>Name cannot be empty</FormFeedback>
          		</Col>
        	</FormGroup>
        	<FormGroup row>
          		<Label for="name" sm={3}>Email</Label>
          		<Col sm={9}>
            	<Input invalid={this.state.emailError} type="text" name="email" id="email" onChange={this.handleEmailChange.bind(this)} value={this.state.email}/>
            	<FormFeedback>Please enter a valid email</FormFeedback>
          		</Col>
        	</FormGroup>
        	<FormGroup row style={{marginBottom: 0}}>
          		<Label for="password" sm={3}>Password</Label>
          		<Col sm={9}>
            	<Input invalid={this.state.passwordError} type="text" name="password" id="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password}/>
            	<FormFeedback>Password cannot be empty</FormFeedback>
          		</Col>
        	</FormGroup>
        </Form>	
        </Col>
        <Col className="align-self-center text-center" sm="3">
        	<Button className="btn-lg" onClick={this.handleSubmit.bind(this)} style={{margin: 0}} disabled={this.state.nameError || this.state.emailError || this.state.passwordError }>Update</Button>
        </Col>
        </Row>
        </Container>
    )
}
}

export default UserInfo;
