import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import ProductResults from './ProductResults';
import '../SearchBar.scss';

const initialState = {
    showAdvanced: false,
    inputValue: '',
    category: 'ALL',
    sort: 'ASC',
    showProductName: true,
    showDescription: true,
    showPrice: true,
    results: [],
    count: 0,
};

class ProductSearch extends Component{
    state = initialState;

    inputOnChange = e => {
        this.setState({inputValue: e.target.value});
    };

    categoryOnChange = e => {
        this.setState({category: e.target.value});
    };

    sortOnChange = e => {
        this.setState({sort: e.target.value});
    };

    handleProductName = e => {
        if (this.state.showProductName) {
            this.setState({showProductName: false});
        } else {
            this.setState({showProductName: true});
        }
    };

    handleDescription = e => {
        if (this.state.showDescription) {
            this.setState({showDescription: false});
        } else {
            this.setState({showDescription: true});
        }
    };

    handlePrice = e => {
        if (this.state.showPrice) {
            this.setState({showPrice: false});
        } else {
            this.setState({showPrice: true});
        }
    };

    handleToggle = () => {
        if (this.state.showAdvanced) {
            this.setState({showAdvanced:false});
        } else {
            this.setState({showAdvanced:true});
        }
    };

    handleSubmit = () => {
        const displayString = [];
        if (this.state.showProductName) {
            displayString.push('name');
        }
        if (this.state.showDescription) {
            displayString.push('description');
        }
        if (this.state.showPrice) {
            displayString.push('price')
        }
        if (this.state.category === "ALL") {
            const advancedSearch = {
                input: this.state.inputValue,
                columns: displayString.join(','),
                sort: this.state.sort,
            };
            fetch('./api/products/results', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(advancedSearch)
            })
              .then(res => res.json())
              .then((response) => {
                  this.setState({ results: response.data });
              })
              .catch(console.log);
        } else {
            const advancedSearch = {
                input: this.state.inputValue,
                category: this.state.category,
                columns: displayString.join(','),
                sort: this.state.sort,
            };
            fetch('./api/products/advresults', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(advancedSearch)
            })
              .then(res => res.json())
              .then((response) => {
                  this.setState({ results: response.data });
              })
              .catch(console.log);
        }
        // TODO: handling for no results
    };

    render() {
        return (
            <Container fluid className='centered'>
                <Form className='search'>
                    <FormGroup>
                        <div className="input-group">
                            <Input
                                type="text"
                                placeholder="Get rECOmmendations for..."
                                onChange={e => this.inputOnChange(e)}
                            />
                            <div>
                                <Button
                                    className="dropdown-toggle"
                                    onClick={this.handleToggle}>
                                    <span className="caret"/>
                                </Button>
                                <Button
                                    onClick={this.handleSubmit}>
                                    Search
                                </Button>
                            </div>
                            <div className={this.state.showAdvanced ? 'advanced-search' : 'hidden'}>
                                <Label>Advanced Search</Label>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Product Category</Label>
                                            <Input type="select" onChange={e => this.categoryOnChange(e)}>
                                                <option value="ALL">All Categories</option>
                                                <option value="CAT1">Fashion</option>
                                                <option value="CAT4">Home Goods</option>
                                                <option value="CAT8">Organic</option>
                                                <option value="CAT3">Personal Care</option>
                                                <option value="CAT5">Recreation</option>
                                                <option value="CAT7">Recycled</option>
                                                <option value="CAT6">Reusable</option>
                                                <option value="CAT2">Utensils</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>Sort By</Label>
                                            <Input type="select" onChange={e => this.sortOnChange(e)}>
                                                <option value="ASC">Price Ascending</option>
                                                <option value="DESC">Price Descending</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="check-label">Display</Label>
                                        <FormGroup check inline>
                                            <Label check className="check-label">
                                                <Input type="checkbox" defaultChecked='true' disabled />Product Photo
                                            </Label>
                                            <Label check className="check-label">
                                                <Input type="checkbox" defaultChecked='true' onChange = {e => this.handleProductName(e)}/>Name
                                            </Label>
                                            <Label check className="check-label">
                                                <Input type="checkbox" defaultChecked='true' onChange={e => this.handleDescription(e)}/>Description
                                            </Label>
                                            <Label check className="check-label">
                                                <Input type="checkbox" defaultChecked='true' onChange={e => this.handlePrice(e)}/>Price
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </FormGroup>
                </Form>
                <div className='results'>
                    Returned {this.state.results.length} results out of {this.state.count}
                    <Row fluid className='featuredRow'>
                        <ProductResults results={this.state.results}/>
                    </Row>
                </div>
            </Container>
        );
    }

    componentDidMount() {
        fetch('./api/products')
            .then(res => res.json())
            .then((data) => {
                this.setState({ results: data.data });
            })
            .catch(console.log);

        fetch('./api/products/count')
          .then(res => res.json())
          .then((data) => {
              this.setState({count: data.data.count});
          })
          .catch(console.log);
    }
}

export default ProductSearch;
