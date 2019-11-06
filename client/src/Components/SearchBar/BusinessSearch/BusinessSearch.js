import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Container, Button, Row, Col } from 'reactstrap';
import BusinessResults from '../BusinessSearch/BusinessResults';
import '../SearchBar.scss';

const initialState = {
    showAdvanced: false,
    inputValue: '',
    certification: 'ANY',
    sort: 'ASC',
    showBusinessName: true,
    showDescription: true,
    results: [],
    count: 0,
};

class BusinessSearch extends Component{
    state = initialState;

    inputOnChange = e => {
        this.setState({inputValue: e.target.value});
    };

    certificationOnChange = e => {
        this.setState({certification: e.target.value});
    };

    sortOnChange = e => {
        this.setState({sort: e.target.value});
    };

    handleBusinessName = e => {
        if (this.state.showBusinessName) {
            this.setState({showBusinessName: false});
        } else {
            this.setState({showBusinessName: true});
        }
    };

    handleDescription = e => {
        if (this.state.showDescription) {
            this.setState({showDescription: false});
        } else {
            this.setState({showDescription: true});
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
        if (this.state.showBusinessName) {
            displayString.push('business.name');
        }
        if (this.state.showDescription) {
            displayString.push('business.description');
        }
        if (this.state.certification === "ANY") {
            console.log('any certifications');
            const advancedSearch = {
                input: this.state.inputValue,
                columns: displayString.join(','),
                sort: this.state.sort,
            };
            console.log(advancedSearch);
            fetch('./api/search/business/anycert', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(advancedSearch)
            })
              .then(res => res.json())
              .then((response) => {
                  console.log(response);
                  this.setState({ results: response.data });
              })
              .catch(console.log);
        } else if (this.state.certification === "ALL") {
            console.log('all certifications');
                const advancedSearch = {
                    input: this.state.inputValue,
                    columns: displayString.join(','),
                    sort: this.state.sort,
                };
                fetch('./api/search/business/allcerts', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(advancedSearch)
                })
                  .then(res => res.json())
                  .then((response) => {
                      console.log(response);
                      this.setState({ results: response.data });
                  })
                  .catch(console.log);
            } else {
                console.log('ELSE');
                const advancedSearch = {
                    input: this.state.inputValue,
                    certification: this.state.certification,
                    columns: displayString.join(','),
                    sort: this.state.sort,
                };
                console.log(JSON.stringify(advancedSearch));
                fetch('./api/search/business/results', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(advancedSearch)
                })
                  .then(res => res.json())
                  .then((response) => {
                      console.log(response);
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
                                          <Label>Business Certification</Label>
                                          <Input type="select" onChange={e => this.certificationOnChange(e)}>
                                              <option value="ANY">Any Certification</option>
                                              <option value="CERTID1">Fair Trade Certified</option>
                                              <option value="CERTID2">Climate Commitment Certification</option>
                                              <option value="CERTID3">Global Organic Textile Standard</option>
                                              <option value="CERTID4">Certified B-Corp</option>
                                              <option value="CERTID5">Certified Green Business</option>
                                              <option value="ALL">All Certifications</option>
                                          </Input>
                                      </FormGroup>
                                  </Col>
                                  <Col>
                                      <FormGroup>
                                          <Label>Sort By</Label>
                                          <Input type="select" onChange={e => this.sortOnChange(e)}>
                                              <option value="ASC">List A-Z</option>
                                              <option value="DESC">List Z-A</option>
                                          </Input>
                                      </FormGroup>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col>
                                      <Label className="check-label">Display</Label>
                                      <FormGroup check inline>
                                          <Label check className="check-label">
                                              <Input type="checkbox" defaultChecked='true' onChange = {e => this.handleBusinessName(e)}/>Name
                                          </Label>
                                          <Label check className="check-label">
                                              <Input type="checkbox" defaultChecked='true' onChange={e =>this.handleDescription(e)}/>Description
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
                      <BusinessResults results={this.state.results}/>
                  </Row>
              </div>
          </Container>
        );
    }

    componentDidMount() {
        fetch('./api/search/business')
          .then(res => res.json())
          .then((data) => {
              this.setState({ results: data.data.rows });
          })
          .catch(console.log);

        fetch('./api/search/business/count')
          .then(res => res.json())
          .then((data) => {
              this.setState({ count: data.data.count });
          })
          .catch(console.log);
    }
}

export default BusinessSearch;



