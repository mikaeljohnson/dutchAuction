import React, { useState, Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Auction from './Auction';
import BankGui from './BankGui';
import RedeemBox from './RedeemBox';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './App.css';
import Web3 from 'web3';
import _testToken from '../abis/testToken.json'
import _Dutch_Auction from '../abis/Dutch_Auction.json'

// const contract = "0x6D4230FEb15ED41ebfd19DE25E042dFa6Db3b442"
// const token = "0x793D8b9FD7D25B72776B2719F64b036d1f78FAaC"

const contract = "0x6A1F87b71F7c1429feaE4dB2F69eeCaf901EFf96"
const token = "0x2cf4fd8D1A7130d5AEB52BE93C83de582972bbf0"
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
    const networkData = 4 === networkId
    
    if(networkData) {
      const testToken = new web3.eth.Contract(_testToken.abi, token)
      this.setState({testToken})
      const dutchAuction = new web3.eth.Contract(_Dutch_Auction.abi, contract)
      this.setState({dutchAuction})
      const data = await this.getData();
      this.setState({ auctions: data })
      this.setState({ loading: false })
      const bal = await this.state.dutchAuction.methods.viewBalance(this.state.account).call();
      this.setState({bal: bal})
    } else {
      window.alert('You are not connected to the Ethereum network.')
    }
  }

   getData = async () => {
    const auctionCount = await this.state.dutchAuction.methods.auctionCount().call()
    var auctions = [];
    for (var i = 0; i < auctionCount; i++) {
      const auction = await this.state.dutchAuction.methods.auctionInfo(i).call()
      auctions = [...auctions, auction]
      console.log(auction)
    }
    auctions = auctions.filter(_auction => _auction[0].remaining != 0)
    console.log(auctions)
    
    return auctions;
  }

   async findPrice(auctionCount) {
    try{
      return await this.state.dutchAuction.methods.viewPrice(auctionCount).call().then(
        function(result){
          return result
        }
      )
    }catch(error) {
      return 0;
    }
  }

  async approveSpend(price) {
    this.state.testToken.methods.approve(contract, price).send({ from: this.state.account })
}

  async buyAuction(auction, winner) {
    this.state.dutchAuction.methods.buyAuction(auction, winner).send({ from: this.state.account })
}

async depositAuction(amount) {
  //this.state.dutchAuction.methods.buyAuction(auction, contract).send({ from: this.state.account })
  this.state.dutchAuction.methods.deposit(amount).send({ from: this.state.account })
}

async withdrawAuction(amount) {
  //this.state.dutchAuction.methods.buyAuction(auction, contract).send({ from: this.state.account })
  this.state.dutchAuction.methods.userWithdrawl(amount).send({ from: this.state.account })
}

async redeemAuction(auction,winner) {
  //this.state.dutchAuction.methods.buyAuction(auction, contract).send({ from: this.state.account })
  this.state.dutchAuction.methods.redeemValue(auction,winner).send({ from: this.state.account })
}

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      buyAddress:'',
      loading: true,
      auctions: [],
      prices: [],
      bal: -1,
    }

    this.buyAuction = this.buyAuction.bind(this)
    this.findPrice = this.findPrice.bind(this)
    this.depositAuction = this.depositAuction.bind(this)
    this.withdrawAuction = this.withdrawAuction.bind(this)
    this.redeemAuction = this.redeemAuction.bind(this)

  }

  render() {
    return (
      <div className="body">        
          <Navbar account={this.state.account}/>
          {/* <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
          }}> */}
          <div>
          <div className="TokenBox">
            <BankGui account={this.state.account} auction={this.state.dutchAuction} bal={this.state.bal} depositAuction={this.depositAuction} withdrawAuction={this.withdrawAuction}/>
            <RedeemBox redeemAuction={this.redeemAuction}/>
          </div>

            <Auction auctions={this.state.auctions} buyAuction={this.buyAuction} findPrice={this.findPrice} />

          {/* { this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : <Router>
              <Switch>
              <Route path="/" exact render={() => <Auction />}/>
              </Switch>
              </Router>
          }
        */}
        </div>
      </div> 
    );
  }
}

export default App;
