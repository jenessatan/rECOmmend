import React from "react";
import { Col, Row } from 'reactstrap';
import PostItem from "../../Post/PostItem";

const Results = ({ results }) => {
    return (
        <Row>
          {results.map((result) => (
            <Col>
              <PostItem title={result.name} description={result.description}/>
            </Col>
              ))}
        </Row>
    )
};

export default Results;
