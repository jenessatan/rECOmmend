import React from "react";
import { Col, Row } from 'reactstrap';
import ProductItem from "../../Cards/ProductItem";

const ProductResults = ({ results }) => {
	console.log(results);
    return (
        <Row >
          {results.map((result) => (
            <Col sm={3}>
              <ProductItem
              		  productid={result.productid}
                    image={result.imagelink}
                    title={result.name}
                    description={result.description}
                    price={result.price}
                    id={result.productid}/>
            </Col>
              ))}
        </Row>
    )
};

export default ProductResults;
