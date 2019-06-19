import React from 'react'
import {Container, Col, Row} from 'reactstrap';
import Hero from '../Components/Hero';
import ProductItem from '../Components/Cards/ProductItem';
import '../App.scss';

function LandingPage() {
  return (
    <Container className='App' fluid>
      <Hero />
      <div className='featured'>
        Featured Products
      </div>
      <Row fluid className='featuredRow'>
        <Col sm={3}>
          <ProductItem productid={'PRODID2'} title={'Mini Arc Reactor'} price={3000}/>
        </Col>
        <Col sm={3}>
          <ProductItem productid={'PRODID3'} title={'tentree Tank'} price={65}/>
        </Col>
        <Col sm={3}>
          <ProductItem productid={'PRODID4'} title={'Bamboo Straw'} price={7}/>
        </Col>
        <Col sm={3}>
          <ProductItem productid={'PRODID5'} title={'KarTent Home'} price={150}/>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
