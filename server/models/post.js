const db = require('../db/config');

const Post = {};

Post.getAllPosts = id => db.result(
	'SELECT * FROM post_info WHERE consumerID' = $1, [id]
);

Post.