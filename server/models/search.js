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
	//, has_cert hc WHERE b.businessId = hc.businessId`
};

Search.findBusinessAllCertifications = () => {
	return db.result(
		`SELECT DISTINCT businessid 
		FROM has_cert AS hc
		 WHERE NOT EXISTS(
		 (SELECT certid FROM certification)
		 EXCEPT
		 (SELECT certid FROM has_cert WHERE businessid = hc.businessid))`);
};

Search.findBusinessByCertification = (cert) => {
	return db.result(
		`SELECT business.name, business.email, business.description, business.url
		FROM business, has_cert, certification, businesslocation
		WHERE business.businessid = businesslocation.businessid
		AND business.businessid = has_cert.businessid
		AND has_cert.certid = certification.certid
		AND has_cert.certid = $1`, [cert]);
};

module.exports = Search;
