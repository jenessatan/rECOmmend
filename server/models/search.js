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
	return db.result(
		'SELECT * from products ORDER BY price ASC'
	);
};

Search.getNumberOfBusinesses = () => db.one(`SELECT COUNT(*) FROM business`);

Search.findAllBusinesses = () => {
	return db.result(`SELECT * FROM business`);
};

Search.findBusinessAllCertifications = (payload) => {
	const {columns, sort} = payload;
	const queryString =
		`SELECT business.url, business.businessid, ${columns}
		FROM business
		WHERE businessid IN (
		SELECT DISTINCT businessid
		FROM has_cert AS hc
		WHERE NOT EXISTS(
		(SELECT certid FROM certification)
		EXCEPT
		(SELECT certid FROM has_cert WHERE businessid = hc.businessid)))
		ORDER BY business.name ${sort}`;
	return db.result(queryString);
};

Search.findBusinessByNameAndCertification = (payload) => {
	const {columns, input, certification, sort} = payload;
	const queryString =
		`SELECT business.url, ${columns}  
		FROM business
		WHERE (business.name ILIKE '%${input}%' OR business.description ILIKE '%${input}%')
		AND business.businessid IN (
		SELECT DISTINCT business.businessid
		FROM business, has_cert
		WHERE has_cert.certid = '${certification}'
		AND business.businessid = has_cert.businessid)
		ORDER BY business.name ${sort}`;
	return db.result(queryString)
};

Search.findBusinessByNameAndAnyCertification = (payload) => {
	const { columns, input, sort } = payload;
	console.log(payload);
	const queryString =
		`SELECT business.url, business.businessid, ${columns}
		FROM business
		WHERE business.name ILIKE '%${input}%' OR business.description ILIKE '%${input}%'
		GROUP BY business.businessid 
		ORDER BY business.name ${sort}`;
	console.log(queryString);
	return db.result(queryString);
};


module.exports = Search;
