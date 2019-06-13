const db = require('../db/config');
const Search = {};

Search.findProductAnd = (id, payload) => {
	return db.result(`SELECT * FROM products WHERE name = $/name/, email = $/email/ WHERE consumerid = $/id/`,
	{name: payload.name,
	maxPrice: payload.maxPrice,
	minPrice: payload.minPrice,
	description: payload.description});
};

Search.findAllProducts = () => {
	return db.result('SELECT * from products');
};

module.exports = Search;
