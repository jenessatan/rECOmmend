const router = require('express').Router();
const productController = require('../../controllers/productController');
const searchController = require('../../controllers/searchController');

router.get('/', searchController.findAllProducts);

router.get('/category', productController.findByCategory);

router.post('/results', productController.findByCategoryAndName);

router.get('/soldby', productController.findBySeller);

//added
router.post('/new/:businessId', productController.addNewProduct);

//added not tested
router.patch('/:productid', productController.editProduct);
//added not tested
router.delete('/:productid', productController.deleteProduct);

router.post('/', (req, res)=> {
	return res.send('test add new product');
});

router.post('/', (req, res) => res.send('test add new product'));

router.put('/:postid', (req, res) => res.send('test product put'));

router.delete('/:postid', (req, res) => res.send('test product delete'));

module.exports = router;
