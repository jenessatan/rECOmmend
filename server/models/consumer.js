const db = require('../db/config');
const Consumer = {};

Consumer.deleteById = (id) => {
	return db.result(
		`DELETE FROM consumer WHERE consumerid = $1`, [id]
	);
};

// TODO: Change to db.tx
Consumer.editById = (id, payload) => {
	return db.result(`UPDATE consumer SET name = $/name/, email = $/email/ WHERE consumerid = $/id/`,
	{name: payload.name,
	email: payload.email,
	id: id});
};

Consumer.findById = (id) => {
  return db.oneOrNone(
    `SELECT * FROM consumer WHERE consumerid = $1`,
    [id]    
  );
};

module.exports = Consumer;