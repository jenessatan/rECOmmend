import React from 'react'
import {Container, Col, Row} from 'reactstrap';
import Hero from '../Components/Hero';
import ProductItem from '../Components/Cards/ProductItem';
import prodid1 from '../Assets/products/prodid1.jpg';
import prodid2 from '../Assets/products/prodid2.jpg';
import prodid3 from '../Assets/products/prodid3.jpg';
import prodid4 from '../Assets/products/prodid4.jpg';
import prodid5 from '../Assets/products/prodid5.jpg';
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
          <ProductItem image={prodid2} title={'Mini Arc Reactor'} price={3000}/>
        </Col>
        <Col sm={3}>
          <ProductItem image={prodid3} title={'tentree Tank'} price={65}/>
        </Col>
        <Col sm={3}>
          <ProductItem image={prodid4} title={'Bamboo Straw'} price={7}/>
        </Col>
        <Col sm={3}>
          <ProductItem image={prodid5} title={'KarTent Home'} price={150}/>
        </Col>
      </Row>
      {/*<hr className="my-2" style={{width: '90%'}} />*/}
      {/*<div className='featured'>*/}
      {/*  Featured Posts*/}
      {/*</div>*/}
      {/*<Row fluid className='featuredRow'>*/}
      {/*  <Col sm='2'>*/}
      {/*    <PostItem title='Test Feature' author='Peter Parker' />*/}
      {/*  </Col>*/}
      {/*  <Col sm='2'>*/}
      {/*    <PostItem title='Test Feature' author='Peter Parker' />*/}
      {/*  </Col>*/}
      {/*  <Col sm='2'>*/}
      {/*    <PostItem title='Test Feature' author='Peter Parker' />*/}
      {/*  </Col>*/}
      {/*  <Col sm='2'>*/}
      {/*    <PostItem title='Test Feature' author='Peter Parker' />*/}
      {/*  </Col>*/}
      {/*  <Col sm='2'>*/}
      {/*    <PostItem title='Test Feature' author='Peter Parker' />*/}
      {/*  </Col>*/}
      {/*  <Col sm='2'>*/}
      {/*    <PostItem title='Test Feature' author='Peter Parker' />*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </Container>
  );
}

export default LandingPage;
