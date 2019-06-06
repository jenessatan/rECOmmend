const Post = require('../models/post_info');

const postController = {};

postController.getAllPosts = (req, res) => {
	Post.getAllPosts(req.params.id)
		.then((response) => {
		if (response){
			res.json({
				message: 'Success',
				data: response.rows
			});
		} else {
				throw new Error (`Consumer ${req.params.id} does not have any posts`);
		}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}`});
		});
};

postController.makeNewPost = (req, res) => {
	const payload = {
		title: req.body.title,
		content: req.body.content,
	};
	Post.getNumberOfPosts()
		.then(numberOfPosts => {
			let postNumber = Number(numberOfPosts.count) + 1;
			let postId = `P`.concat(String(postNumber));
			Post.addConsumerActivity(req.params.consumerId, payload)
				.then( response => {
					if (response.rowCount === 1 ) {
						Post.makeNewPost(postId, req.params.consumerId, payload)
							.then(response => {
								if (response.rowCount === 1) {
									res.send({
										message: 'Successfully posted'
									});
								} else {
									throw new Error(`Unable to make new post`);
								}
							})
							.catch(error => {
								throw new Error(error);
							});
					} else {
						throw new Error(`Unable to add to consumer activity`);
					}
				})
				.catch(error => {
					throw new Error(error);
				})
		})
		.catch(error => {
			res.status(500).json({error: `${error}`});
		});
};

module.exports = postController;
