// models/products.js
const db = require('../db/config');

const Products = {};

Products.findByCategory = category => db.query(
  'SELECT * FROM products WHERE ProductID IN (SELECT ProductID FROM has_prodcat WHERE ProdCatID IN (SELECT ProdCatID from product_category WHERE name = $1))',
  [category]
);

Products.findByCategoryAndName = (payload) => {
  console.log(payload);
  return db.result(`SELECT $/columns/ FROM products WHERE name LIKE $/input/ AND ProductID in (SELECT ProductID from has_prodcat WHERE prodcatID = $/category/)`,
  {
    columns: payload.columns,
    input: payload.input,
    category: payload.category.substring(1, payload.category.length-1),
  })
};

// Products.findByName = (payload) => {
//   return `SELECT $1 FROM products WHERE name LIKE '%$2%'`,
//   {
//
//   }
// };

Products.findBySeller = business => db.query(
  'SELECT * FROM products WHERE ProductID In (SELECT ProductID FROM sells WHERE BusinessID IN (SELECT BusinessID from business WHERE name = $1))',
  [business]
);



module.exports = Products;
