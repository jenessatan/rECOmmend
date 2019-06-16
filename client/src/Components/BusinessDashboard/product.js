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

class Product extends Component {
  constructor(props){
    super(props);
    this.state ={
      total: ''
    }
  }


  componentDidMount(){
    fetch(`./api/business/product/${this.props.id}`)
    .then(res => res.json())
    .then(response => {
      console.log('product total:', response.data);
      this.setState({total: response.data.length});
    })
  }

  render() {
    return(
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
            <Card>
            <Navbar>
                <NavbarBrand>Product Overview</NavbarBrand>
                <hr className="my-2" style={{ width: "100%" }} />
              </Navbar>
              <CardBody>
                <CardTitle style={{textAlign: 'center', fontWeight: 'bold', fontSize:'25pt'}}>{this.state.total}</CardTitle>
              </CardBody>
            </Card>
          </CardDeck>
    )
  }
}

export default Product;