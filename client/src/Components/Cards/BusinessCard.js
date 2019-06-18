import React, {Component} from 'react';
import { Button, Card, CardTitle, CardText } from 'reactstrap';

class BusinessCard extends Component {
  render() {
    return (
          <Card body>
            <CardTitle>{this.props.name}</CardTitle>
            <CardText>{this.props.description}</CardText>
            <a href={this.props.url}>Website</a>
          </Card>
    )
  }
}

export default BusinessCard;
