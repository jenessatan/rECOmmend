import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardDeck,
  Col,
  Row,
  Navbar,
  NavbarBrand,
  Nav
} from "reactstrap";
import { Redirect } from "react-router-dom";
import "./BusinessDashboard.scss";
import ProfileForm from "./editprofile";
import Certification from "./certification";
import ProfileView from './viewprofile'

class BusinessDashboard extends Component {
  state = {
    isLoggedIn: !!window.localStorage.getItem("user"),
    isEditing: false,
    id: window.localStorage.userid,
    name: "",
    description: "",
    website: "",
    email: ""
  };

  logout = () => {
    window.localStorage.clear();
    this.setState({ isLoggedIn: false });
  };

  profileToggle = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="dashboard">
          <Button onClick={this.logout}>Logout</Button>
          <CardDeck>
            <Card>
              <Navbar>
                <NavbarBrand>Profile</NavbarBrand>
                <Nav>
                  <Button color="link" onClick={this.profileToggle}>
                    Edit
                  </Button>
                </Nav>
                <hr className="my-2" style={{ width: "100%" }} />
              </Navbar>
              <CardBody>
                {this.state.isEditing ? (
                  <ProfileForm
                    description={this.state.description}
                    name={this.state.name}
                    email={this.state.email}
                  />
                ) : (
                  <ProfileView                     
                  description={this.state.description}
                  name={this.state.name}
                  email={this.state.email}/>
                )}
              </CardBody>
            </Card>

            <Card>
              <Navbar>
                <NavbarBrand>Certifications</NavbarBrand>
                <hr className="my-2" style={{ width: "100%" }} />
              </Navbar>
              <CardBody>
                <Certification id={this.state.id} />
              </CardBody>
            </Card>
          </CardDeck>
          <CardDeck>
            <Card>
              <Navbar>
                <NavbarBrand>Rewards</NavbarBrand>
                <hr className="my-2" style={{ width: "100%" }} />
              </Navbar>
              <CardBody>
                <CardText>Business Dashboard</CardText>
              </CardBody>
            </Card>
          </CardDeck>
          <CardDeck>
            <Card>
              <Navbar>
                <NavbarBrand>Product Overview</NavbarBrand>
                <hr className="my-2" style={{ width: "100%" }} />
              </Navbar>
              <CardBody>
                <CardTitle>Profile</CardTitle>
                <CardText>
                  Hello World! This is a test of the card text
                </CardText>
              </CardBody>
            </Card>
          </CardDeck>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }

  componentDidMount() {
    fetch(`./api/business/${this.state.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          id: data.data.businessid,
          name: data.data.name,
          description: data.data.description,
          website: data.data.url,
          email: data.data.email
        });
      })
      .catch(console.log);
  }
}

export default BusinessDashboard;
