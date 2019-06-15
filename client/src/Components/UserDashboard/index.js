import React, { Component } from 'react';
import { Button, Card, CardBody, CardDeck, CardText, CardTitle, Jumbotron} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import './UserDashboard.scss';
import ConsumerPosts from './ConsumerActivity';
import UserInfo from './UserInfo';

class UserDashboard extends Component{
    state = {
    	consumerEmail: '',
    	consumerName: '',
    	consumerPassword: '',
        consumerPosts: [],
        consumerPoints: 0,
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
        } else {
            return (<Redirect to='/'/>)
        }
    }

    componentDidMount() {
    	console.log('mounted');
    	console.log(window.localStorage.getItem('user-id'));
    	fetch(`./api/account/${window.localStorage.getItem('user-id')}`)
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
        fetch(`./api/posts/${window.localStorage.getItem('user-id')}`)
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
