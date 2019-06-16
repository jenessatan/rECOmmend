const Business = require('../models/business');

const businessController = {};

businessController.findById = (req, res) => {
  Business.findById(req.params.accountid)
    .then((response) => {
  	if (response) {
  		res.json({
      		message: 'Success',
      		data: response
    	});
      } else {
        throw new Error(`Account ${req.params.accountid} not found`);
      }
    })
    .catch((err) => {
  	console.log('error message');
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

businessController.editById = (req, res) => {
  console.log('***payload***');
  console.log(req.body);
  const payload = {
    name: req.body.name,
    email: req.body.email
	 };
  Business.editById(req.params.accountid, payload)
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

businessController.deleteById = (req, res) => {
  Business.deleteById(req.params.accountid)
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

businessController.login = (req, res) => {
  console.log(req.body.email);
  Business.login(req.body.email, req.body.password)
    .then((business) => {
      if (business) {
        res.json({
          success: !!business,
          message: `Successfully logged in for ${business.email}`,
          data: business.businessid
        });
      } else {
        res.json({
          success: !!business,
          message: `Login failed for ${req.body.email}, please try again`
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

businessController.getCert = (req, res) => {
  Business.getCert(req.params.accountid)
    .then((response) => {
  	if (response) {
  		res.json({
      		message: 'Success',
      		data: response.rows
    	});
      } else {
        throw new Error(`Account ${req.params.accountid} not found`);
      }
    })
    .catch((err) => {
  	console.log('error message');
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

module.exports = businessController;
