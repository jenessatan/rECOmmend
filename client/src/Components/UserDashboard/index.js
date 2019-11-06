import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardDeck, CardFooter, CardText, CardTitle, Col, FormGroup, Input, Label, Jumbotron, Row, Table} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import './UserDashboard.scss';
import ConsumerPosts from './ConsumerActivity';
import RewardsHistory from './RewardsHistory';
import UserInfo from './UserInfo';

class UserDashboard extends Component{
    state = {
    	availRewards: [],
    	chosenReward: '',
    	consumerEmail: '',
    	consumerName: '',
    	consumerPassword: '',
        consumerPosts: [],
        consumerPoints: 0,
        consumerRewards: [],
        isLoggedIn: !!window.localStorage.getItem('user'),
        showSuccessfulRedeemAlert: false,
        showUnsuccessfulRedeemAlert: false,
    };
    
    dismissSuccessfulRedeemAlert() {
    	this.setState({showSuccessfulRedeemAlert:false});
    }
    
    dismissUnsuccessfulRedeemAlert() {
    	this.setState({showUnsuccessfulRedeemAlert: false});
    }

    logout = () => {
        window.localStorage.clear();
        this.setState({isLoggedIn: false})
    };
    
    handleRedeemReward() {
    	var index = document.getElementById("availRewards").value;
    	console.log(this.state.availRewards[index].name);
  		fetch(`./api/reward/redeem`, {
  			headers: {
  				'content-type': 'application/json'},
  			body: JSON.stringify({
  				'businessID': this.state.availRewards[index].businessid,
				'consumerID': window.localStorage.getItem('userid'),
				'rewardName': this.state.availRewards[index].rewardname,
				'points': this.state.availRewards[index].pointvalue
  				}),
  			method: 'POST'
  		})
  		.then(res => res.json())
  		.then(data => {
  			if (data.error) {
  				throw new Error(data.error);
  			}
  			else {
  				// Get updated points
					fetch(`./api/account/${window.localStorage.getItem('userid')}`)
    				.then(res => res.json())
    				.then( (response) => {
    					this.setState({ consumerPoints: response.data.points});
    					// Get updated rewards history	    					
    					fetch(`./api/reward/history/${window.localStorage.getItem('userid')}`)
        					.then(res => res.json())
        					.then((data) => {
        						this.setState({ consumerRewards: data.data});
        					})
        					.catch(error => {
								throw new Error('Error retrieving updated rewards history');
        					}); 
        				// Trigger success alert
  						this.setState({showSuccessfulRedeemAlert: true});	 			
    				})
    				.catch(error => {
    					console.log('Error updated account information');
    				});
  				}
  		})
  		.catch(error => {
  			this.setState({unsuccessfulAlertMessage: error.message,
  						   showUnsuccessfulRedeemAlert: true});
  		})	
    }

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
                        			<h5>Your current points balance: { this.state.consumerPoints }</h5>
                        			<br />
                        			<FormGroup>
                        				<Label for="availRewards">Available rewards</Label>
                        				<Input type="select" id="availRewards">
                        					{this.state.availRewards.map((reward, index) => (
                        						<option value={index}>
                        							{reward.name}: {reward.rewardname} ({reward.pointvalue} points)
                        						</option>))}
                        				</Input>
                        			</FormGroup>

                        		<Row className="justify-content-end">
                        		<Col sm={2} className="mx-5">
  	                      		<Button className="btn-lg" onClick={this.handleRedeemReward.bind(this)}>Redeem</Button>
  	                      		</Col>
  	                      		</Row>
  	                      		<Row className="justify-content-middle">
  	                      		<Col sm={12} className="mr-5 mt-4">
 								<Alert color="success" isOpen={this.state.showSuccessfulRedeemAlert} toggle={this.dismissSuccessfulRedeemAlert.bind(this)}>
 									Reward successfully redeemed!
 								</Alert>
 								<Alert color="danger" isOpen={this.state.showUnsuccessfulRedeemAlert} toggle={this.dismissUnsuccessfulRedeemAlert.bind(this)}>
 									We are sorry. The same type of reward can only be redeemed from the same business once per day.
 								</Alert>
 								</Col>
                        		</Row>
                        		</CardText>
                        	</CardBody>
                        </Card>
                    </CardDeck>
                    </Col>
                </Row>
                <Row className="activity-card justify-item-center mx-3 my-6">
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
                    				<RewardsHistory history={this.state.consumerRewards}></RewardsHistory>
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
    	fetch(`./api/account/${window.localStorage.getItem('userid')}`)
    		.then(res => res.json())
    		.then( (response) => {
    			this.setState({ consumerPoints: response.data.points});
    			this.setState({ consumerEmail: response.data.email});
    			this.setState({ consumerPassword: response.data.password});
    			this.setState({ consumerName: response.data.name});
    			fetch(`./api/reward/${this.state.consumerPoints}`)
        			.then(res => res.json())
        			.then((data) => {
        				this.setState({ availRewards: data.data});
        			})
        			.catch(error => {
        				console.log('Error retrieving available rewards');
        				console.log(error);
        			});    			
    		})
    		.catch(error => {
    			console.log('Error retrieving account information');
    			console.log(error);
    		});
        fetch(`./api/posts/${window.localStorage.getItem('userid')}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ consumerPosts: data.data });
            })
            .catch(error => {
            	console.log('Error retrieving consumer post history');
            	console.log(error);
            });
        fetch(`./api/reward/history/${window.localStorage.getItem('userid')}`)
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
