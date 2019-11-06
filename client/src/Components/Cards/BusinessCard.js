import React, {Component} from 'react';
import { Button, Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap';
import elephantlogo from '../../Assets/products/elephantlogo.png';

class BusinessCard extends Component {
  render() {
    return (
      <div>
          <Card>
            <CardBody height="">
              <img width="100%" src={elephantlogo} alt="Card image" />
              <CardTitle className='cardPostTitle'>{this.props.name} </CardTitle>
              <CardSubtitle className='cardPostSubtitle'>{this.props.description}</CardSubtitle>
              <Button color="link"><a href={this.props.url}>Website</a></Button>
            </CardBody>
          </Card>
      </div>
    )
  }
}

export default BusinessCard;
