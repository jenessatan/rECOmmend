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
                    price={result.price}
                    id={result.productid}/>
            </Col>
              ))}
        </Row>
    )
};

/*const ProductBusiness = ({ results }) => {
    return(
      <Row>
        {results.map(() => (
          <Col sm={3}>
            <ProductItem
                business1={result.name}/>
        </Col>
          ))}
      </Row>
      )
};*/

export default ProductResults;
