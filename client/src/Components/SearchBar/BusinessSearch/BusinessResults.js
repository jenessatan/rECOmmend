import React from "react";
import { Col, Row } from 'reactstrap';
import BusinessCard from "../../Cards/BusinessCard";

const BusinessResults = ({ results }) => {
  return (
    <Row>
      {results.map((result) => (
        <Col sm={3}>
          <BusinessCard
            name={result.name}
            description={result.description}
            url={result.url}
          />
        </Col>
      ))}
    <div height='250px'/>
    </Row>
  )
};

export default BusinessResults;
