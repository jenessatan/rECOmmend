import React, {Component} from 'react';

class Hero extends Component {
  render() {
    return (
      <div id="hero" className="Hero" style={{backgroundImage: 'url('+require('../../Assets/hero.png')+')'}}>
        <div className="content">
          <h2>Let's Make Good Choices</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis tempus nisi sit amet elementum. Duis ac lobortis risus. Donec sem dui, placerat condimentum nulla vitae, dictum feugiat nisi. Nulla a laoreet augue, molestie lobortis neque. Aliquam turpis massa, efficitur non commodo feugiat, pharetra sollicitudin odio. Aenean tempus, nunc ac efficitur lobortis, metus turpis lacinia tellus, nec facilisis libero justo quis erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}

export default Hero;