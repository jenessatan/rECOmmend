const router = require('express').Router();
const productController = require('../../controllers/productController');

router.get('/category/:category', productController.findByCategory);

router.get('/sells/:business', productController.findBySeller);

router.get('/', (req, res) => res.send('test get all products'));

router.post('/', (req, res) => res.send('test add new product'));

router.put('/:postid', (req, res) => res.send('test product put'));

router.delete('/:postid', (req, res) => res.send('test product delete'));

module.exports = router;
