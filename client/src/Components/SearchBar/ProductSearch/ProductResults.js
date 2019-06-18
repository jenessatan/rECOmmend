import React from "react";
import { Col, Row } from 'reactstrap';
import ProductItem from "../../Cards/ProductItem";

const ProductResults = ({ results }) => {
    return (
        <Row >
          {results.map((result) => (
            <Col sm={3}>
              <ProductItem
                    image={result.imageLink}
                    title={result.name}
                    description={result.description}
                    price={result.price}/>
            </Col>
              ))}
        </Row>
    )
};

export default ProductResults;
