import React, {Component} from 'react';
import { Button, Card, CardImg, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import elephantlogo from '../../Assets/elephantlogo.png';
import prodid1 from '../../Assets/products/prodid1.jpg';
import prodid2 from '../../Assets/products/prodid2.jpg';
import prodid3 from '../../Assets/products/prodid3.jpg';
import prodid4 from '../../Assets/products/prodid4.jpg';
import prodid5 from '../../Assets/products/prodid5.jpg';
import _ from 'lodash';


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
      <Card>
        <CardImg top width="100%" src={this.props.image} alt="Card image" />
        <CardBody height="">
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
