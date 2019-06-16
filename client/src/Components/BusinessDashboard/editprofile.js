import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: this.props.name,
      email: this.props.email,
      description: this.props.description,
      deleteModalVisible: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState(prevState => ({
      deleteModalVisible: !prevState.deleteModalVisible
    }));
  };

  deleteProfile = () => {
    fetch(`./api/business/${this.props.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response.message);
      });
    this.props.logout();
  };

  updateProfile = () => {
    fetch(`./api/business/${this.props.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.company,
        email: this.state.email,
        description: this.state.description
      })
    });
    this.props.toggle();
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleNameChange = e => {
    this.setState({ company: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({description: e.target.value})
  }

  render() {
    return (
      <>
        <div className="content">
          <Form className="editProfileForm">
            <Row>
              <Col>
                <FormGroup>
                  <label>Company</label>
                  <Input
                    defaultValue={this.props.name}
                    placeholder="Company"
                    type="text"
                    onChange={this.handleNameChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <Input
                    defaultValue={this.props.email}
                    placeholder={this.props.email}
                    onChange={this.handleEmailChange}
                    type="email"
                  />
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
                    onChange={this.handleDescriptionChange}
                    rows="4"
                    type="textarea"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="danger" onClick={this.toggleModal}>
                  Delete Profile
                </Button>
                <Modal
                  isOpen={this.state.deleteModalVisible}
                  toggle={this.toggleModal}
                >
                  <ModalHeader toggle={this.toggleModal}>
                    Delete account?
                  </ModalHeader>
                  <ModalBody>
                    Are you sure you want to delete this account? This process
                    cannot be undone.
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.deleteProfile}>
                      Delete Account
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </Col>
              <Col className="text-right">
                <Button color="success" onClick={this.updateProfile}>
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

export default ProfileForm;