import React, { Component } from 'react';

class NavigationBar extends Component{
    render() {
        return (
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand" href='/'>rECOmmend</a>
            </nav>
        );
    }
}

export default NavigationBar;
