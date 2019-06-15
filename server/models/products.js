// models/products.js
const db = require('../db/config');

const Products = {};

Products.findByCategory = category => db.query(
  'SELECT * FROM products WHERE ProductID IN (SELECT ProductID FROM has_prodcat WHERE ProdCatID IN (SELECT ProdCatID from product_category WHERE name = $1))',
  [category]
);

Products.findByCategoryAndName = (payload) => {
  console.log(payload, 'model');
  const { columns, input, category } = payload;
  const queryString = `SELECT ` + columns + `, COUNT(*) FROM products WHERE name LIKE '%` + input + `%' AND ProductID in (SELECT ProductID from has_prodcat WHERE prodcatID = '` + category +`') GROUP BY productID`;
  console.log(queryString);
  return db.result(queryString);
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

//added
Products.getNumberOfProducts = () => {
	return db.one(`SELECT COUNT(*) FROM products`);
};

//added
Products.addNewPost = (productId, payload) => {
	return db.result(
		`INSERT INTO products (productId, name, price, description, imageLink`, [productId, payload.name, payload.price, payload.description, payload.imageLink],
	);
}; 


module.exports = Products;
