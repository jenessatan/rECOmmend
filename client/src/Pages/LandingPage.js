import React from 'react'
import {Container, Col, Row} from 'reactstrap';
import Hero from '../Components/Hero';
import PostItem from '../Components/Post/PostItem';
import '../App.scss';

function LandingPage() {
  return (
    <Container className='App' fluid>
      <Hero />
      <div className='featured'>
        Featured Products
      </div>
      <Row fluid className='featuredRow'>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
      </Row>
      <hr className="my-2" style={{width: '90%'}} />
      <div className='featured'>
        Featured Posts
      </div>
      <Row fluid className='featuredRow'>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
        <Col sm='2'>
          <PostItem title='Test Feature' author='Peter Parker' />
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;