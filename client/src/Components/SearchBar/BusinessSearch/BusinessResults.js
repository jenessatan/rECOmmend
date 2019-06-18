import React from "react";
import { Col, Row } from 'reactstrap';
import BusinessCard from "../../Cards/BusinessCard";

const BusinessResults = ({ results }) => {
  return (
    <Row>
      {results.map((result) => (
        <Col sm={6}>
          <BusinessCard
            name={result.name}
            description={result.description}
            url={result.url}
          />
        </Col>
      ))}
    </Row>
  )
};

export default BusinessResults;
