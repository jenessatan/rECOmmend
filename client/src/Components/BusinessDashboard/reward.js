import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardDeck,
  Navbar,
  NavbarBrand,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

import _ from "lodash";
import RedeemedReward from './redeemedreward';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

class Reward extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avgReward: "",
      total: "",
      rewards: []
    };
  }

  componentDidMount() {
    fetch(`./api/business/${this.props.id}/avgNumRewards`)
      .then(res => res.json())
      .then(response => {
        const average = response.data.avg;
        const avg = _.round(average, 2);
        this.setState({ avgReward: avg });
      });
    fetch(`./api/business/reward/${this.props.id}`)
      .then(res => res.json())
      .then(response => {
        this.setState({ total: response.data.length, rewards: response.data });
      });
  }

  editReward = (name) => {
    console.log('editing: ', name)
  }

  deleteReward = (name) => {
    console.log('deleting: ', name);
    fetch(`./api/business/reward/${this.props.id}`,  {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name
      })
  })
  fetch(`./api/business/${this.props.id}/avgNumRewards`)
  .then(res => res.json())
  .then(response => {
    const average = response.data.avg;
    const avg = _.round(average, 2);
    this.setState({ avgReward: avg });
  });
fetch(`./api/business/reward/${this.props.id}`)
  .then(res => res.json())
  .then(response => {
    this.setState({ total: response.data.length, rewards: response.data });
  });
}

  render() {
    return (
      <CardDeck>
        <Col className="col-sm-2 stackedCol flex-column">
          <Row style={{ marginBottom: "10pt", height: "48%" }}>
            <Card style={{ margin: "0" }}>
              <Navbar>
                <NavbarBrand>Reward Overview</NavbarBrand>
                <hr className="my-2" style={{ width: "100%" }} />
              </Navbar>
              <CardBody className="text-center">
                <CardTitle style={{ fontWeight: "bold", fontSize: "25pt" }}>
                  {this.state.total}
                </CardTitle>
                <CardText>
                  {this.state.total === 1
                    ? "reward offered"
                    : "rewards offered"}
                </CardText>
              </CardBody>
            </Card>
          </Row>
          <Row style={{ paddingTop: "10pt", height: "48%" }}>
            <Card style={{ margin: "0" }}>
              <Navbar>
                <NavbarBrand>Avg Redeemed</NavbarBrand>
                <hr className="my-2" style={{ width: "100%" }} />
              </Navbar>
              <CardBody className="text-center">
                <CardTitle style={{ fontWeight: "bold", fontSize: "25pt" }}>
                  {this.state.avgReward}
                </CardTitle>
                <CardText>
                  {this.state.avgReward === 1
                    ? "reward redeemed per customer"
                    : "rewards redeemed per customer"}
                </CardText>
              </CardBody>
            </Card>
          </Row>
        </Col>
        <Card>
          <Navbar>
            <NavbarBrand>Offered Rewards</NavbarBrand>
          </Navbar>
          <CardBody>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th>Name</th>
                  <th>Points</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {this.state.rewards.map((val, idx) => (
                  <tr key={"reward" + idx}>
                    <td>{val.rewardname}</td>
                    <td>{val.pointvalue}</td>
                    <td className='text-right'>
                      {/* <Button className="btn-round btn-icon btn-icon-mini btn-neutral" color="info" onClick={() => {this.editReward(val.rewardname)}}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button> */}
                      <Button className="btn-round btn-icon btn-icon-mini btn-neutral" color="danger" onClick={()=> {this.deleteReward(val.rewardname)}}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card>        
          <Navbar>
            <NavbarBrand>Redeemed Rewards</NavbarBrand>
            <hr className="my-2" style={{ width: "100%" }} />
          </Navbar>    
          <RedeemedReward id={this.props.id} />
        </Card>
      </CardDeck>
    );
  }
}

export default Reward;
