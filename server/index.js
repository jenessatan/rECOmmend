const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

// const db = require('./database');
const api = require('./api');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.get('/', (req, res) => {
  res.send('This is rECOmmend!');
});

app.use('/api', require('./api'));

app.listen(PORT, () => {
  if (ENV === 'development') {
    console.log(`DEV: App is running and listening on Port ${PORT}`);
  } else {
    console.log('App is running');
  }
});

module.exports = app;
