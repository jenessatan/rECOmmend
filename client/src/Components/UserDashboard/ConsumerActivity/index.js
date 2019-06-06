import React from 'react'

const ConsumerPosts = ({ posts }) => {
    return (
        <div>
            {posts.map((post) => (
                <h5 className="card-title">{post.title}</h5>
            ))}
        </div>
    )
};

export default ConsumerPosts;
