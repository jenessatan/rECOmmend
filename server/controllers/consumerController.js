const Consumer = require('../models/consumer');

const consumerController = {};

// TODO: Might want to find a better way to handle account not found

consumerController.findByEmail = (req, res) => {
  Consumer.findByEmail(req.params.email)
    .then((response) => {
  	if (response) {
  		res.json({
      		message: 'Success',
      		data: response
    	});
      } else {
        throw new Error(`Account ${req.params.email} not found`);
      }
    })
    .catch((err) => {
  	console.log('error message');
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

consumerController.editById = (req, res) => {
  console.log('***payload***');
  console.log(req.body);
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
	 };
  Consumer.editById(req.params.accountid, payload)
    .then((response) => {
      if (response.rowCount === 1) {
        res.send({
          message: 'Success'
        });
      } else {
        throw new Error(`Unable to update account ${req.params.accountid}`);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `${error}` });
    });
};

consumerController.deleteById = (req, res) => {
  Consumer.deleteById(req.params.accountid)
    .then((response) => {
      if (response.rowCount === 1) {
        res.json({
          message: 'Success'
        });
      } else {
        console.log(response);
        throw new Error(`Unable to delete account ${req.params.accountid}`);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

consumerController.login = (req, res) => {
  console.log(req.body.email);
  Consumer.login(req.body.email, req.body.password)
    .then((consumers) => {
      if (consumers) {
      	console.log('*********consumers');
      	console.log(consumers);
        res.json({
          success: !!consumers,
          message: `Successfully logged in for ${consumers.email}`,
          accountid: consumers.consumerid
        });
      } else {
        res.json({
          success: !!consumers,
          message: `Login failed for ${req.body.email}, please try again`
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

module.exports = consumerController;
