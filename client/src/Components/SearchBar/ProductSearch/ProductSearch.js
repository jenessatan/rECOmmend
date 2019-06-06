import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BusinessSearch from "../BusinessSearch/BusinessSearch";
import '../SearchBar.scss';

const initialState = {
    showAdvanced: false,
    inputValue: '',
    advancedSearch: {},
};

class ProductSearch extends Component{
    state = initialState;

    onChange = e => {
        this.setState({inputValue: e.target.value});
        console.log(this.state.inputValue);
    };

    handleToggle = () => {
        if (this.state.showAdvanced) {
            this.setState({showAdvanced:false});
        } else {
            this.setState({showAdvanced:true});
        }
    };

    handleSubmit = () => {
        console.log(this.state.inputValue);
        console.log(this.state.advancedSearch);
    };

    render() {
        return (
            <Form>
                <FormGroup>
                    <div className="input-group">
                        <Input
                            type="text"
                            // className="form-control"
                            placeholder="Get rECOmmendations for..."
                            onChange={e => this.onChange(e)}
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
                                        <Input type="select">
                                            <option value="*">All Products</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="homeGoods">Home Goods</option>
                                            <option value="organic">Organic</option>
                                            <option value="personalCare">Personal Care</option>
                                            <option value="recreation">Recreation</option>
                                            <option value="recycled">Recycled</option>
                                            <option value="reusable">Reusable</option>
                                            <option value="utensils">Utensils</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>Sort By</Label>
                                        <Input type="select">
                                            <option>Price Ascending</option>
                                            <option>Price Descending</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label className="check-label">Display</Label>
                                <FormGroup check inline>
                                    <Label check className="check-label">
                                        <Input type="checkbox" />Product Photo
                                    </Label>
                                    <Label check className="check-label">
                                        <Input type="checkbox" />Name
                                    </Label>
                                    <Label check className="check-label">
                                        <Input type="checkbox" />Description
                                    </Label>
                                    <Label check className="check-label">
                                        <Input type="checkbox" />Price
                                    </Label>
                                </FormGroup>
                                </Col>
                            </Row>
                            <BusinessSearch/>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        );
    }
}

export default ProductSearch;
