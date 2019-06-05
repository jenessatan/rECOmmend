const db = require('../db/config');

const Post = {};

Post.getAllPosts = id => db.result(
	'SELECT * FROM post_info WHERE consumerID = $1', [id]
);

/*Post.addNewPost = (id, title, content) => db.result('INSERT INTO post_info VALUES ($/PostID/, $/consumerID/, $/title/, $/content/, $/points_earned/', 
{
	PostID:,
	consumerID: id,
	title,
	content,
	points_earned: 150
});	*/

module.exports = Post;