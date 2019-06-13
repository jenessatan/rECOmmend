import React, { Component } from 'react';
import ConsumerPosts from './ConsumerActivity';
import {Jumbotron, Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import './UserDashboard.scss';


class UserDashboard extends Component{
    state = {
        consumerPosts: [],
        isLoggedIn: !!window.localStorage.getItem('user')
    };

    logout = () => {
        window.localStorage.clear();
        this.setState({isLoggedIn: false})
    };

    render() {
        if(this.state.isLoggedIn){
        return (
            <div className="dashboard">
                <Jumbotron className='subHero'/>
                <Button onClick={this.logout}>Logout</Button>
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
        } else {
            return (<Redirect to='/'/>)
        }
    }

    componentDidMount() {
        fetch('./api/posts/CID1')
            .then(res => res.json())
            .then((data) => {
                // console.log(data.data);
                this.setState({ consumerPosts: data.data });
            })
            .catch(console.log);
    }
}

export default UserDashboard;
