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
				{this.state.history.map((redemption) => (
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