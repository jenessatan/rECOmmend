var router = require('express').Router();
const searchController = require('../../controllers/searchController');

router.get('/business/:cert', searchController.findBusinessByCertification);
router.get('/product', searchController.findProduct);

module.exports=router;
