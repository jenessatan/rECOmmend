var router = require('express').Router();
const postController = require('../../controllers/postController');

router.get('/:id', postController.getAllPosts);

/*router.post('/', (req, res)=> {
	return res.send('test add new post');
});

router.put('/:postid', (req, res) => {
	return res.send('test post put');
	});
	
router.delete('/:postid', (req, res) => {
	return res.send('test post delete');
});*/

module.exports=router;
