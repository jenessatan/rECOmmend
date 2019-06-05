const Post = require('../models/post_info');

const postController = {};

postController.getAllPosts = (req, res) => {
	Post.getAllPosts(req.params.id)
		.then((response) => {
		console.log(response);
		if (response){
			res.json({
				message: 'Success',
				data: response.rows
			});
		} else{
				throw new Error (`Consumer ${req.params.id} does not have any posts`);					
		}	
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: `${err}`});
		});
		
};

/*postController.addNewPost = (req, res) => {
	Post.addNewPost(req.params.consumerID, req.params.title, req.params.content)
		.then((response) => {
		if (response){
			res.json({
				message: 'Success',
				data: response
			});
		} else{
			throw new Error (`Consumer ${req.params.consumerID} cannot add any new posts`);
		}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: `${err}`});
		});
}*/

module.exports = postController;