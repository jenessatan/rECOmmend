import React, { Component } from 'react';
import ConsumerPosts from './ConsumerActivity';
import './UserDashboard.scss';


class UserDashboard extends Component{
    state = {
        consumerPosts: [],
    };

    render() {
        return (
            <div className="dashboard">
                <div className="about-user">
                    <div className="user card col-md-4">
                        Profile
                    </div>
                    <div className="user card col-md-4">
                        Points
                    </div>
                    <div className="user card col-md-4">
                        Activity
                        <ConsumerPosts posts={this.state.consumerPosts}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/posts/CID1')
            .then(res => res.json())
            .then((data) => {
                console.log(data.data);
                this.setState({ consumerPosts: data.data });
            })
            .catch(console.log);
    }
}

export default UserDashboard;
