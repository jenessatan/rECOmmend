var router = require('express').Router();
const consumerController = require('../../controllers/consumerController');

router.get('/', (req, res) => {
  return res.send('test get all posts');
});

router.post('/', (req, res)=> {
	return res.send('test add new post');
});

router.put('/:postid', (req, res) => {
	return res.send('test post put');
	});
	
router.delete('/:postid', (req, res) => {
	return res.send('test post delete');
});

module.exports=router;
