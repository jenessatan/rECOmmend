// controllers/productController.js

const Products = require('../models/products');

const productController = {};

//added
productController.addNewProduct = (req, res) => {
  const payload = {
    //productId: req.body.productId,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageLink: req.body.description
  };  
  Products.getNumberOfProducts()
    .then(numberOfProducts => {
      let productNumber = Number(numberOfProducts.count) + 1;
      let productId = `PRODID`.concat(String(productNumber));
      Products.addNewProduct(productID, payload)
        .then(response => {
          if (response.rowCount === 1){
            res.send({
              message: 'Successfully added new product'
            });
          } else {
            throw new Error(`Unable to add new product`);
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    })
    .catch(error => {
      res.status(500).json({error: `${error}`});
    });
};

productController.findByCategory = (req, res) => {
  Products.findByCategory(req.body.category)
    .then((products) => {
      if (products && products.length > 0) {
        res.json({
          success: !!products,
          data: products,
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
          data: products.rows,
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
