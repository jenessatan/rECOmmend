var router = require('express').Router();
const searchController = require('../../controllers/searchController');

router.get('/business/count', searchController.getNumberOfBusinesses);
router.post('/business/results', searchController.findBusinessByNameAndCertification);
router.post('/business/anycert', searchController.findBusinessByNameAndAnyCertification);
router.post('/business/allcerts', searchController.findBusinessAllCertifications);
router.get('/business', searchController.findAllBusinesses);
router.get('/product', searchController.findProduct);

module.exports=router;
