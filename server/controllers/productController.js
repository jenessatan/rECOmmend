// controllers/productController.js

const Products = require('../models/products');

const productController = {};

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