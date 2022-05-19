import React, { Component } from 'react';
import Identicon from 'identicon.js';
import POApng from '../ggwt.gif'

class Navbar extends Component {
  
  render() {
    return (
      <nav className="navbar navbar-light fixed-top bg-light flex-md-nowrap p-1 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://rinkeby.etherscan.io/address/0x3EF59268579816F3D650F29bFfb57710739e2947"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={POApng} width="60" height="60" className="d-inline-block align-top-left" alt="" />
          Waifu House Dao Dutch Auctions
        </a>
      
          <a href="/"> Home </a>
          <a href="#post"> Post </a>
          <a href="#profile"> Profile </a>

       

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            { (this.props.account !== '' )
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`} 
              />
              :
              <img
              className='ml-2'
              width='30'
              height='30'
              src={POApng} 
              />
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;