const router = require('express').Router();
const productController = require('../../controllers/productController');
const searchController = require('../../controllers/searchController');

router.get('/', searchController.findAllProducts);

router.get('/category', productController.findByCategory);

router.post('/results', productController.findByName);

router.post('/advresults', productController.findByCategoryAndName);

router.get('/soldby', productController.findBySeller);

router.get('/count', productController.getNumberOfProducts);

//added
router.post('/new/:businessId', productController.addNewProduct);

router.post('/', (req, res)=> {
	return res.send('test add new product');
});

router.post('/', (req, res) => res.send('test add new product'));

router.put('/:postid', (req, res) => res.send('test product put'));

router.delete('/:postid', (req, res) => res.send('test product delete'));

module.exports = router;
