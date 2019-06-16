import React, { Component } from 'react';
import { Table } from 'reactstrap';

class RewardsHistory extends Component {
	constructor(props) {
		super(props);
	}
	
	static defaultProps = {
		history: []
	}
	
	state = {
		history: this.props.history
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		if (nextProps.history !== prevState.history) {

			return nextProps;
		}
	}
	
	static componentDidUpdate(prevProps, prevState) {
		console.log('compontnupdated');
		if (prevProps.history !== this.props.history) {
		this.setState({history: this.props.history});
		}
	}	
	
	componentWillReceiveProps(props) {
		console.log('willreceive');
		this.setState({history: this.props.history});
	}
	
	render() {
		if (this.state.history.length < 1) {
			return (<h5> You have not redeemed any rewards yet</h5>);
		}
		return(
		<Table striped>
			<thead>
				<tr>
					<th>Date</th>
					<th>Business</th>
					<th>Reward</th>
				</tr>
			</thead>
			<tbody>
				{this.props.history.map((redemption) => (
					<tr>
						<td>{new Date(redemption.date).toLocaleDateString()}</td>
						<td>{redemption.name}</td>
						<td>{redemption.rewardname}</td>
					</tr>
				))}
			</tbody>
		</Table>
		);
	}	
}

export default RewardsHistory;