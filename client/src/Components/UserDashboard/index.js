import React, { Component } from 'react';
import { Card, CardBody, CardDeck, CardText, CardTitle, Jumbotron} from 'reactstrap';
import './UserDashboard.scss';
import ConsumerPosts from './ConsumerActivity';
import UserInfo from './UserInfo';

class UserDashboard extends Component{
    state = {
    	// TODO: Change to check local login
    	consumerEmail: '',
    	consumerName: '',
    	consumerPassword: '',
        consumerPosts: [],
        consumerPoints: 0,
    };

    render() {
        return (
            <div className="dashboard">
                <Jumbotron className='subHero' style={{backgroundImage: 'url('+require('../../Assets/evening.png')+')'}}>
                </Jumbotron>
                	<div class="row align-items-start" className="about-user">
                	<div class="col">
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
                        			Your current points balance:<br />
                        			{ this.state.consumerPoints }
                        			<br />
                        			<br />
                        			Available rewards
                        		</CardText>
                        	</CardBody>
                        </Card>
                    </CardDeck>
                    </div>
                </div>
                <div class="row justify-items-center mx-3 my-6">
                	<div class="col">
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
                	</div>
                </div>
                <div class="row justify-items-center mx-3 my-6">
                	<div class="col">
                		<CardDeck>
                    	<Card>
                    		<CardBody>
	                    		<CardTitle>
                    				<h2>Your rewards history</h2>
                    			</CardTitle>                    		
                    			<CardText>
                    				<ConsumerPosts posts={this.state.consumerPosts}/>
                    			</CardText>
                    		</CardBody>
                    	</Card>
                    </CardDeck>
                	</div>
                </div>                
            </div>
        );
    }

    componentDidMount() {
    	fetch('http://localhost:5000/api/account/iamgroot@iamgroot.com')
    		.then(res => res.json())
    		.then( (response) => {
    			this.setState({ consumerPoints: response.data.points});
    			this.setState({ consumerEmail: response.data.email});
    			this.setState({ consumerPassword: response.data.password});
    			this.setState({ consumerName: response.data.name});
    			console.log('initial call');
    			console.log(this.state);
    		})
    		.catch(error => {
    			console.log(error);
    		});
        fetch('http://localhost:5000/api/posts/CID1')
            .then(res => res.json())
            .then((data) => {
                this.setState({ consumerPosts: data.data });
            })
            .catch(error => {
            	console.log(error)
            });
    }
}

export default UserDashboard;
