import React from "react";
import { Col, CardDeck, Row } from 'reactstrap';
import ProductItem from "../../Cards/ProductItem";

const ProductResults = ({ results }) => {
    return (
      <Row style={{width:"100%"}}>
        <CardDeck >
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
        </CardDeck>
      </Row>
    )
};

export default ProductResults;
