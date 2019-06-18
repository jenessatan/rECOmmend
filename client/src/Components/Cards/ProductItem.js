import React, {Component} from 'react';
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import elephantlogo from '../../Assets/products/elephantlogo.png';
import prodid1 from '../../Assets/products/prodid1.jpg';
import prodid2 from '../../Assets/products/prodid2.jpg';
import prodid3 from '../../Assets/products/prodid3.jpg';
import prodid4 from '../../Assets/products/prodid4.jpg';
import prodid5 from '../../Assets/products/prodid5.jpg';
class ProductItem extends Component {
  state = {
    modal: false
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  // componentWillReceiveProps(props) {
  //   console.log('willreceive');
  //   this.setState({image: this.props.image});
  // }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.props.title}</ModalHeader>
          <ModalBody>
            Sold at:
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      <Card>
        <img width="100%" src={this.props.image} alt="Card image" />
        <CardBody height="">
          <CardText>{this.props.image}</CardText>
          <CardTitle className='cardPostTitle productTitle'>{this.props.title}  {'- $'+ this.props.price} </CardTitle>
          <CardSubtitle className='cardPostSubtitle productDescription'>{this.props.description}</CardSubtitle>
          <Button color="link" onClick={this.toggleModal}>See Retailers</Button>
        </CardBody>
      </Card>
    </div>
    )
  }
}

ProductItem.defaultProps = {
  image: elephantlogo,
  description: '',
  price: '',
};

export default ProductItem;
