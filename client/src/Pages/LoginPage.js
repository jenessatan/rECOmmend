import React from 'react'
import Login from '../Components/Login/Login.js';
import {Container} from 'reactstrap';

import '../App.scss';

function LoginPage() {
  return (
    <Container fluid className='loginPage'>
        <div className='row justify-content-md-center align-items-center vh-100'>
          <Login />
        </div>
    </Container>
  );
}

export default LoginPage;
