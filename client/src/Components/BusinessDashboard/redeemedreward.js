import React, { Component } from "react";
import { CardBody } from "reactstrap";
import {HorizontalBar} from 'react-chartjs-2';
import _ from "lodash";

class RedeemedReward extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rewardData: []
    };
  }

  componentDidMount() {
    fetch(`./api/business/redeemedreward/${this.props.id}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ rewardData: response.data });
      });
  }

  processRewardData = () => {
    const rewardData = this.state.rewardData;
    const labels = [];
    const values = [];

    _.forEach(rewardData, (val) => {
      const {rewardname, count} = val;
      labels.push(rewardname);
      values.push(parseInt(count, 10));
    })

    return {labels, values};
  }

  render() {
    const redeemedData = this.processRewardData();
    const data = {
      labels: redeemedData.labels,
      datasets: [{
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: redeemedData.values
      }]
    }
    const options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
    return (
      <CardBody>
        <HorizontalBar data={data} options={options}/>
      </CardBody>
    );
  }
}

export default RedeemedReward;
