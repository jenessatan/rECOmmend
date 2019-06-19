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
import _ from 'lodash';

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
    modal: false,
    businesses: []
  };

  componentDidMount() {
        fetch(`./api/products/business/${this.props.id}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data.data);
                const business = _.map(data.data, 'name');
                console.log(business);
                this.setState({businesses: business});
                console.log('state', this.state.businesses);
            })
            .catch(console.log);
    }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
  console.log(this.props.productid);
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.props.title}</ModalHeader>
          <ModalBody>
            <p>Sold at: </p>
            <ul>
            {_.map(this.state.businesses, (val, idx) =>
              <li key={idx}>{val}</li>
              )}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      <Card style={{minHeight:"15%",maxHeight:"15%", bottomMargin:"100px"}}>
        <CardImg top width="100%" src={imageDict[this.props.productid]} alt="Card image" />
        <CardBody>
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
