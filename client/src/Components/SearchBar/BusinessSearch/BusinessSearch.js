import React, {Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../SearchBar.scss';

class BusinessSearch extends Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <Label>Business Certification</Label>
                    <Input type="select">
                        <option value="*">All Certifications</option>
                        <option value="fairtrade">Fair Trade Certified</option>
                        <option value="climate">Climate Commitment Certification</option>
                        <option value="organictextile">Global Organic Textile Standard</option>
                        <option value="Bcorp">Certified B-Corp</option>
                        <option value="green">Certified Green Business</option>
                    </Input>
                </FormGroup>
            </Form>
        );
    }
}

export default BusinessSearch;



