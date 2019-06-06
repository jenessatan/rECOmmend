const db = require('../db/config');

const Post = {};

Post.getAllPosts = id => db.result(
	'SELECT * FROM post_info WHERE consumerID = $1', [id]
);

Post.addConsumerActivity = (consumerId, payload)  => {
	return db.result(
		'INSERT INTO consumer_activity values ($1, $2, CURRENT_DATE)', [consumerId, payload.title]
	);
};

Post.getNumberOfPosts = () => {
	return db.one(`SELECT COUNT(*) FROM post_info`);
};

Post.makeNewPost = (postId, consumerId, payload) => {
	return db.result( //db.none if return nothing
		`INSERT INTO post_info (PostID, consumerID, title, content, points_earned) values ($1, $2, $3, $4, 150)`, [postId, consumerId, payload.title, payload.content],
	);
};


// Post.editByPostId = (consumerId, postId, payload) => {
//     return db.result(
//         `UPDATE post_info SET title = $/title/, content = $/content/ WHERE consumerId = $/consumerId/ AND postId = $/postId/`,
//             {
//                 postId: postId,
//                 consumerId: consumerId,
//                 title: payload.title,
//                 content: payload.content,
//             }
//         );
// };
//
// Post.getByPostId = (postId) => {
//     return db.oneOrNone(
//         `SELECT * FROM consumer WHERE postId = $1`, [postId]
//     );
// };

module.exports = Post;
