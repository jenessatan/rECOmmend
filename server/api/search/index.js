var router = require('express').Router();
const searchController = require('../../controllers/searchController');

router.get('/business', searchController.findBusiness);
router.get('/product', searchController.findProduct);

module.exports=router;
