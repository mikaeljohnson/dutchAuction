import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import VInterface from '../abis/VInterface.json'
import Vesting from '../abis/Vesting.json'
import IERC20 from '../abis/IERC20.json'
import styled from "styled-components";
import gif from '../2ggwt.gif';




class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = 137 == networkId
    if(networkData) {
      const oldVest = new web3.eth.Contract(VInterface.abi, "0x1DBE25868679EDe8Eb93fED1138dc3d19ABb74B1")
      this.setState({oldVest})
      const newVest = new web3.eth.Contract(Vesting.abi, "0xce7695743698d8e7635CC973568D8f70a45a1729")
      this.setState({newVest})
      const token = new web3.eth.Contract(IERC20.abi, "0xc08e94e12ca1357DF36F3c16c3A1df5F84c7B801")
      this.setState({token})
      const appValue = await newVest.methods.beneficiaryBalance(accounts[0]).call()
      this.setState({appValue})
      console.log(appValue)
    } else {
      window.alert('You are not connected to the Polygon network.')
    }
  }

  claimAndApprove = description => {
    console.log("Claiming And Approving")
    console.log(this.state.appValue)

    this.state.oldVest.methods.claim().send({ from: this.state.account })
    console.log(this.state.appValue)

    this.state.token.methods.approve("0xce7695743698d8e7635CC973568D8f70a45a1729", this.state.appValue).send({ from: this.state.account })
    console.log(this.state.appValue)

  }

  claimNFT = description => {
    console.log("Claiming NFT")
    this.state.newVest.methods.claimNFT().send({ from: this.state.account })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true,
      appValue: 0
    }

    this.claimNFT = this.claimNFT.bind(this)
    this.claimAndApprove = this.claimAndApprove.bind(this)

  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Gigawatt Founders NFT Launch
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              
              <div className="content mr-auto ml-auto">
               
                  <img src={gif} className="App-logo" alt="logo" />
               
                
                <h1>Gigawatt Founders NFTs</h1>
                <p>
                  Follow the buttons to receive your Founders NFT, please only click button 2 after confirming the first 2 transactions
                </p>
                <button       style={{height: '30px', width : '200px'}}


                      onClick={(e) => {
                        e.preventDefault();
                        this.claimAndApprove();
                        
                      }}
                      ></button> 
                
                    <button     style={{height: '30px', width : '200px'}}

                      onClick={(e) => {
                        e.preventDefault();
                        this.claimNFT();
                        
                      }}
                      ></button> 
              </div>
              
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
