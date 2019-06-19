import React, {Component} from 'react';
import { Button, Card, CardImg, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import elephantlogo from '../../Assets/elephantlogo.png';
import PRODID1 from '../../Assets/products/prodid1.jpg';
import PRODID2 from '../../Assets/products/prodid2.jpg';
import PRODID3 from '../../Assets/products/prodid3.jpg';
import PRODID4 from '../../Assets/products/prodid4.jpg';
import PRODID5 from '../../Assets/products/prodid5.jpg';
import PRODID6 from '../../Assets/products/prodid6.jpg';
import PRODID7 from '../../Assets/products/prodid7.jpg';
import PRODID8 from '../../Assets/products/prodid8.jpg';
import PRODID9 from '../../Assets/products/prodid9.jpg';

const imageDict = {
PRODID1,
PRODID2,
PRODID3,
PRODID4,
PRODID5,
PRODID6,
PRODID7,
PRODID8,
PRODID9
};

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
  console.log(this.props.productid);
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
        <CardImg top width="100%" src={imageDict[this.props.productid]} alt="Card image" />
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
