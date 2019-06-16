import React, {Component} from 'react';

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
      <div>
        <ul>
        {certificates.map((val, idx) => {
          return <li key={idx}>{val}</li>
        })}
        </ul>
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
      console.log(this.state.certs);
    })
  }
}

export default Certification;