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
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

businessController.editById = (req, res) => {
  console.log('***payload***');
  console.log(req.body);
  const payload = {
    name: req.body.name,
    email: req.body.email,
    description: req.body.description
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

businessController.deleteReward = (req, res) => {
  Business.deleteReward(req.params.accountid, req.body.name)
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

businessController.deleteProduct = (req, res) => {
  Business.deleteProduct(req.params.accountid, req.body.productid)
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
    });
};

businessController.getReward = (req, res) => {
  Business.getReward(req.params.accountid)
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
      console.log(err);
    });
};

// added
businessController.avgRewardsRedeemedByBusiness = (req, res) => {
  Business.avgRewardsRedeemed(req.params.accountid)
    .then((response) => {
      if (response) {
        res.json({
          message: 'Success',
          data: response
        });
      } else {
        throw new Error('Unable to find reward history');
      }
    })
    .catch((err) => {
      console.log('error message');
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

businessController.getProduct = (req, res) => {
  Business.getProduct(req.params.accountid)
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
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

businessController.redeemedRewards = (req, res) => {
  Business.redeemedRewards(req.params.accountid)
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
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};
module.exports = businessController;
