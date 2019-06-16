import React, {Component} from 'react';
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

class Overview extends Component {
  componentDidMount(){}

  render() {
    return(
      <CardDeck>
      <Card>
        <Navbar>
          <NavbarBrand>Offered Rewards</NavbarBrand>
          <hr className="my-2" style={{ width: "100%" }} />
        </Navbar>
        <CardBody>
          <CardText>Business Dashboard</CardText>
        </CardBody>
      </Card>
      <Card>
      <Navbar>
          <NavbarBrand>Offered Rewards</NavbarBrand>
          <hr className="my-2" style={{ width: "100%" }} />
        </Navbar>
      </Card>
      <Card>
      <Navbar>
          <NavbarBrand>Offered Rewards</NavbarBrand>
          <hr className="my-2" style={{ width: "100%" }} />
        </Navbar>
      </Card>
    </CardDeck>
    )
  }
}

export default Overview;