import React, {Component} from 'react';
import _ from 'lodash';

class Certification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessid: this.props.id,
      certs: []
    }
  }

  render = () => {
    const certificates = this.state.certs;
    return(
      <div style={{marginTop: '10pt'}}>
        <p className='text-center'>{_.join(certificates, '  |  ')}</p>
      </div>
    )
  }

  componentDidMount = () => {
    fetch(`./api/business/cert/${this.state.businessid}`)
    .then(res => res.json())
    .then(response => {
      const {data} = response;
      let certificateName = data.map(val => {
        return val.certname;
      })
      this.setState({certs: certificateName});
    })
  }
}

export default Certification;
