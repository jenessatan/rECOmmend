var router = require('express').Router();
const consumerController = require('../../controllers/consumerController');

router.get('/', (req, res) => {
  return res.send('test get all products');
});

router.post('/', (req, res)=> {
	return res.send('test add new product');
});

router.put('/:postid', (req, res) => {
	return res.send('test product put');
});
	
router.delete('/:postid', (req, res) => {
	return res.send('test product delete');
});

module.exports=router;
