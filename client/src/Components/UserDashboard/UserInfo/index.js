import React, { Component } from 'react';
import {Col, Form, FormGroup, Input, Label } from 'reactstrap';

class UserInfo extends Component {
	static defaultProps = {
            name: "name default value",
            email: "email default value",
            password: ''
    }
	
	state = {
			name: this.props.name,
			email: this.props.email,
			password: this.props.password
		}
		
	static getDerivedStateFromProps(nextProps, prevState){
		if (nextProps.name !== prevState.name) {
			return nextProps;
		}
	}
	
    render() {
    	return(
    	<div>
        <Form>
        	<FormGroup row>
          		<Label for="name" sm={2}>Name</Label>
          		<Col sm={10}>
            	<Input type="text" name="name" id="exampleEmail" placeholder={this.state.name} />
          		</Col>
        	</FormGroup>
        	<FormGroup row>
          		<Label for="name" sm={2}>Email</Label>
          		<Col sm={10}>
            	<Input type="text" name="email" id="exampleEmail" placeholder={this.state.email} />
          		</Col>
        	</FormGroup>
        	<FormGroup row>
          		<Label for="password" sm={2}>Password</Label>
          		<Col sm={10}>
            	<Input type="text" name="password" id="ex" placeholder={this.state.password} />
          		</Col>
        	</FormGroup>
        </Form>
        </div>
    )
}
}

export default UserInfo;
