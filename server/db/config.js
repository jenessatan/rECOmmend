require('dotenv').config();

const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);

const setDB = () => {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return pgp({
      database: process.env.PGDB,
      port: process.env.PGPORT,
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      ssl: true
    });
  } if (process.env.NODE_ENV === 'production') {
    return pgp({
      database: process.env.PGDB,
      port: process.env.PGPORT,
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      ssl: true
    });
  }
};

const db = setDB();

module.exports = db;
