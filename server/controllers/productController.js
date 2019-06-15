// controllers/productController.js

const Products = require('../models/products');
const Business = require('../models/business');

const productController = {};

// added
productController.addNewProduct = (req, res) => {
  const payload = {
    // productId: req.body.productId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageLink: req.body.imageLink
  };
  Products.getNumberOfProducts()
    .then((numberOfProducts) => {
      const productNumber = Number(numberOfProducts.count) + 1;
      const productId = 'PRODID'.concat(String(productNumber));
      Products.addNewProduct(productId, payload)
        .then((response) => {
          if (response.rowCount === 1) {
            Business.sellsNewProduct(productId, req.params.businessId)
              .then((rsp) => {
                if (rsp.rowCount === 1) {
                  res.send({
                    message: 'Successfully added new product to business'
                  });
                } else {
                  throw new Error('unable to add new product to business');
                }
              })
              .catch((error) => {
                throw new Error(error);
              });
          } else {
            throw new Error('unable to add new product');
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    })
    .catch((error) => {
      res.status(500).json({ error: `${error}` });
    });
};

productController.findByCategory = (req, res) => {
  Products.findByCategory(req.body.category)
    .then((products) => {
      if (products && products.length > 0) {
        res.json({
          success: !!products,
          data: products
        });
      } else {
        res.json({
          success: !!products,
          data: 'Data unavailable'
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

productController.findByCategoryAndName = (req, res) => {
  Products.findByCategoryAndName(req.body)
    .then((products) => {
      if (products && products.rows.length > 0) {
        res.json({
          success: !!products,
          data: products.rows
        });
      } else {
        res.json({
          success: !!products,
          data: 'Data unavailable'
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

productController.findBySeller = (req, res) => {
  Products.findBySeller(req.body.business)
    .then((products) => {
      if (products && products.length > 0) {
        res.json({
          success: !!products,
          data: products
        });
      } else {
        res.json({
          success: !!products,
          data: 'Data unavailable'
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

module.exports = productController;
