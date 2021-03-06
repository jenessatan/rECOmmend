import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import '../../App.scss';

class Header extends Component {

  render() {
    return (
      <Navbar light>
      <NavbarBrand href='/' className='navBarBrand'>rECOmmend</NavbarBrand>
      <Nav>
        <NavItem className='navItem'>
          <NavLink className='navLink' activeclassname='active' href='/products'>Products</NavLink>
        </NavItem>
        <NavItem className='navItem'>
          <NavLink className='navLink' activeclassname='active' href='/business'>Businesses</NavLink>
        </NavItem>
        <NavItem className='navItem'>
          <NavLink className='navLink' activeclassname='active' href='/profile'>Profile</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    )
  }
}

export default Header;
