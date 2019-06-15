import React, { Component } from 'react';
import {Jumbotron,   Button, Collapse} from 'reactstrap';
import {Redirect} from 'react-router-dom';
// import './BusinessDashboard.scss';
import ProfileForm from './editprofile'


class BusinessDashboard extends Component{
    state = {
        consumerPosts: [],
        isLoggedIn: !!window.localStorage.getItem('user'),
        profileCollapse: false
    };

    logout = () => {
        window.localStorage.clear();
        this.setState({isLoggedIn: false})
    };

    profileToggle = () => {
        this.setState({profileCollapse: !this.state.profileCollapse})
    }

    render() {
        if(this.state.isLoggedIn){
        return (
             <div className="dashboard">
                <h1>Business Dashboard</h1>
                <div>
                    <Button onClick={this.profileToggle}>Edit Profile</Button>
                    <Collapse isOpen={this.state.profileCollapse}>
                        <ProfileForm /> 
                    </Collapse>
                </div>
                <Button onClick={this.logout}>Logout</Button>
                <div className="about-user">
                    <div className="user card col-md-4">
                        BusinessDashboard
                    </div>
                    <div className="user card col-md-4">
                        Points
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

export default BusinessDashboard;