import React, {Component} from 'react';
import {Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col} from 'reactstrap';

class ProfileForm extends Component {
  render() {
    console.log(this.props.email);
    return (
      <>
  <div className="content">
            <Form className='editProfileForm'>
              <Row>
                <Col>
                  <FormGroup>
                    <label>Company (disabled)</label>
                    <Input
                      defaultValue={this.props.name}
                      disabled
                      placeholder="Company"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">
                      Email address
                    </label>
                    <Input defaultValue={this.props.email} placeholder={this.props.email} type="email" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>Description</label>
                    <Input
                      cols="80"
                      defaultValue={this.props.description}
                      placeholder={this.props.description}
                      rows="4"
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
  </div>
</>
);
  }
}

export default ProfileForm;