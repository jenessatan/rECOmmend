import React, { Component } from 'react';
import { Button, Card, CardBody, CardDeck, CardText, CardTitle, Col, Jumbotron, Row} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import './UserDashboard.scss';
import ConsumerPosts from './ConsumerActivity';
import RewardsHistory from './RewardsHistory';
import UserInfo from './UserInfo';

class UserDashboard extends Component{
    state = {
    	consumerEmail: '',
    	consumerName: '',
    	consumerPassword: '',
        consumerPosts: [],
        consumerPoints: 0,
        consumerRewards: [],
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
                <Jumbotron className='subHero' style={{backgroundImage: 'url('+require('../../Assets/evening.png')+')'}}>
                </Jumbotron>
                <Button onClick={this.logout}>Logout</Button>
                	<Row className="about-user align-items-start my-3">
                	<Col>
                	<CardDeck>
                    	<Card>
                        	<CardBody>
                        		<CardTitle class="px-1">
                        			<h2>Profile</h2>
                        		</CardTitle>
                        		<CardText>
                        			<UserInfo name={this.state.consumerName} email={this.state.consumerEmail} password={this.state.consumerPassword}/>
                        		</CardText>
                        	</CardBody>
                        </Card>
                    
                    	<Card style={{maxWidth: 600}}>
                        	<CardBody>
	                    		<CardTitle>
	                        		<h2>Points</h2>
	                        	</CardTitle>                        	
                        		<CardText>
                        			Your current points balance: { this.state.consumerPoints }
                        			<br />
                        			Available rewards
                        		</CardText>
                        	</CardBody>
                        </Card>
                    </CardDeck>
                    </Col>
                </Row>
                <Row className="activity-card justify-items-center mx-3 my-6">
                	<Col>
                		<CardDeck>
                    	<Card>
                    		<CardBody>
	                    		<CardTitle>
                    				<h2>Your recent posts</h2>
                    			</CardTitle>                    		
                    			<CardText>
                    				<ConsumerPosts posts={this.state.consumerPosts}/>
                    			</CardText>
                    		</CardBody>
                    	</Card>
                    </CardDeck>
                	</Col>
                </Row>
                <Row className="justify-items-center mx-3 my-6 activity-card" >
                	<Col>
                		<CardDeck mx-3>
                    	<Card>
                    		<CardBody>
	                    		<CardTitle>
                    				<h2>Your rewards history</h2>
                    			</CardTitle>                    		
                    			<CardText>
                    				<RewardsHistory history={this.state.consumerRewards}/>
                    			</CardText>
                    		</CardBody>
                    	</Card>
                    </CardDeck>
                	</Col>
                </Row>                
            </div>
        );
        } else {
            return (<Redirect to='/'/>)
        }
    }

    componentDidMount() {
    	fetch(`./api/account/${window.localStorage.getItem('user-id')}`)
    		.then(res => res.json())
    		.then( (response) => {
    			this.setState({ consumerPoints: response.data.points});
    			this.setState({ consumerEmail: response.data.email});
    			this.setState({ consumerPassword: response.data.password});
    			this.setState({ consumerName: response.data.name});
    		})
    		.catch(error => {
    			console.log('Error retrieving account information');
    			console.log(error);
    		});
        fetch(`./api/posts/${window.localStorage.getItem('user-id')}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ consumerPosts: data.data });
            })
            .catch(error => {
            	console.log('Error retrieving consumer post history');
            	console.log(error)
            });
        fetch(`./api/reward/history/${window.localStorage.getItem('user-id')}`)
        	.then(res => res.json())
        	.then((data) => {
        		this.setState({ consumerRewards: data.data});
        	})
        	.catch(error => {
        		console.log('Error retrieving consumer rewards history');
        		console.log(error);
        	});
    }
}

export default UserDashboard;
