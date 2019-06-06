import React, { Component } from 'react';
import {Jumbotron} from 'reactstrap';
import './UserDashboard.scss';


class UserDashboard extends Component{

    render() {

        return (
            <div className="dashboard">
                <Jumbotron className='subHero'></Jumbotron>
                <div className="about-user">
                    <div className="user card col-md-4">
                        Profile
                    </div>
                    <div className="user card col-md-4">
                        Points
                    </div>
                    <div className="user card col-md-4">
                        Activity
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDashboard;
