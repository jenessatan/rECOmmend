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
  Table,
  Form,
  FormGroup,
  Input
} from "reactstrap";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: "",
      products: [],
      formVisible: false,
      newProduct: {
        name: '',
        price:'',
        description: '',
        imageLink:''
      }
    };
  }

  componentDidMount() {
    fetch(`./api/business/product/${this.props.id}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ total: response.data.length, products: response.data });
      });
  }
  

  toggle = () => {
    this.setState({formVisible: !this.state.formVisible})
  }

  handleDescriptionChange = (e) => {
    this.setState({newProduct: {...this.state.newProduct, description: e.target.value}});
  }

  handleImageChange = (e) => {
    this.setState({newProduct: {...this.state.newProduct, imageLink: e.target.value}});
  }

  handleNameChange = (e) => {
    this.setState({newProduct: {...this.state.newProduct, name: e.target.value}});
  }

  handlePriceChange = (e) => {
    this.setState({newProduct: {...this.state.newProduct, price: e.target.value}});
  }

  addNewProduct = () => {
    fetch(`./api/products/new/${this.props.id}`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.newProduct)
    })
    .then(()=> {
      fetch(`./api/business/product/${this.props.id}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ total: response.data.length, products: response.data });
      });
    })
    this.toggle();
  }

  render() {
    return (
      <CardDeck>
        <Card className="col-sm-2">
          <Navbar>
            <NavbarBrand>Product Overview</NavbarBrand>
            <hr className="my-2" style={{ width: "100%" }} />
          </Navbar>
          <CardBody className="text-center">
            <CardTitle style={{ fontWeight: "bold", fontSize: "25pt" }}>
              {this.state.total}
            </CardTitle>
            <CardText>
              {this.state.total === 1 ? "product offered" : "products offered"}
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <Navbar>
            <NavbarBrand>All Products</NavbarBrand>
            <Button color="link" onClick={this.toggle}>
              Add New
            </Button>
            {this.state.formVisible? 
              <hr className="my-2" style={{ width: "100%" }} /> :
              < ></>
          }
          </Navbar>
          <CardBody>
            {this.state.formVisible? 
            <Form className="editProfileForm">
            <Row>
              <Col>
                <FormGroup>
                  <label>Name</label>
                  <Input
                    placeholder="Product Name"
                    type="text"
                    onChange={this.handleNameChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label>Price</label>
                  <Input
                    placeholder="Product Price"
                    onChange={this.handlePriceChange}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label>Image</label>
                  <Input
                    placeholder="Product Image"
                    onChange={this.handleImageChange}
                    type="text"
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
                    placeholder="Product Description"
                    rows="4"
                    type="textarea"
                    onChange={this.handleDescriptionChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-right">
                <Button color="success" onClick={this.addNewProduct}>
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form> :
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((val, idx) => (
                  <tr key={"product" + idx}>
                    <td>{val.name}</td>
                    <td>{val.price}</td>
                    <td>{val.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            }
          </CardBody>
        </Card>
      </CardDeck>
    );
  }
}

export default Product;
