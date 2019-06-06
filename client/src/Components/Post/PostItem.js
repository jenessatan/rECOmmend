import React, {Component} from 'react';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

class PostItem extends Component {
  render() {
    return (
      <div>
      <Card>
        <CardImg top width="100%" src="https://via.placeholder.com/150" alt="Card image cap" />
        <CardBody>
          <CardTitle className='cardPostTitle'>{this.props.title}</CardTitle>
          <CardSubtitle className='cardPostSubtitle'>By: {this.props.author}</CardSubtitle>
        </CardBody>
      </Card>
    </div>
    )
  }
}

export default PostItem;