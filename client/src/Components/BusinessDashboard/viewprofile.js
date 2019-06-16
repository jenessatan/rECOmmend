import React, {Component} from 'react';
import {
  CardBody} from 'reactstrap';

class ProfileView extends Component {

  render = () => {
    return(
      <div className="card-user">
                <div className="image">
                  <img alt="..." src={require('../../Assets/evening.png')} />
                </div>
                <CardBody>
                  <div className="author">
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require('../../Assets/hero.png')}
                      />
                      <h5 className="title">{this.props.name}</h5>
                    <p className="description">{this.props.email}</p>
                  </div>
                  <p className="description text-center">
                    {this.props.description}
                  </p>
                </CardBody>
      </div>
    )
  }
}

export default ProfileView