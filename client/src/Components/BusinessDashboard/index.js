import React, { Component } from "react";
import {
  Card,
  CardBody,
  Button,
  CardDeck,
  Col,
  Navbar,
  NavbarBrand,
  Nav
} from "reactstrap";
import { Redirect } from "react-router-dom";
import "./BusinessDashboard.scss";
import ProfileForm from "./editprofile";
import ProfileView from './viewprofile';
import Reward from './reward';
import Product from './product';

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
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="dashboard">
            <Col className='text-right'>
          <Button onClick={this.logout} outline color='primary'>Logout</Button>
            </Col>
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
                    id={this.state.id}
                    toggle={this.profileToggle}
                    logout={this.logout}
                  />
                ) : (
                  <ProfileView                     
                  description={this.state.description}
                  name={this.state.name}
                  email={this.state.email}
                  id={this.state.id}/>
                )}
              </CardBody>
            </Card>
          </CardDeck>
          <Reward id={this.state.id} />
          <Product id={this.state.id} />
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
  }
}

export default BusinessDashboard;