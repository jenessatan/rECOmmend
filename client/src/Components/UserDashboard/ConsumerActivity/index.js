import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ConsumerPosts = ({ posts }) => {
    return (
//        <div>
//            {posts.map((post) => (
 //               <h5 className="card-title">{post.title}</h5>
//            ))}
 //       </div>
        <ListGroup flush>
        	            {posts.map((post) => (
                <ListGroupItem><h5>{post.title}</h5></ListGroupItem>
            ))}
        </ListGroup>
    )
};

export default ConsumerPosts;
