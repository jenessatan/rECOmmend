const Business = require('../models/business');

const businessController = {};

businessController.login = (req, res) => {
  console.log(req.body.email);
  Business.login(req.body.email, req.body.password)
    .then((business) => {
      if (business) {
        res.json({
          success: !!business,
          message: `Successfully logged in for ${business.email}`
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

module.exports = businessController;
