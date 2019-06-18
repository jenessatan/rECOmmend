var router = require('express').Router();
const searchController = require('../../controllers/searchController');

router.get('/business/count', searchController.getNumberOfBusinesses);
router.get('/business/:cert', searchController.findBusinessByCertification);
router.get('/business/certs', searchController.findBusinessAllCertifications);
router.get('/business', searchController.findAllBusinesses);
router.get('/product', searchController.findProduct);

module.exports=router;
