import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Auction from './Auction';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './App.css';
import Web3 from 'web3';
import _testToken from '../abis/testToken.json'
import _Dutch_Auction from '../abis/Dutch_Auction.json'


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
      const testToken = new web3.eth.Contract(_testToken.abi, "0x3FF373a39c94CFe9a581bb47784D6f56235Ff62B")
      this.setState({testToken})
      const dutchAuction = new web3.eth.Contract(_Dutch_Auction.abi, "0x6D69a4c47620e56CDbDb64E8E14AD58ada2Cc256")
      this.setState({dutchAuction})
      const data = await this.getData();
      this.setState({ auctions: data })
      this.setState({ loading: false })
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
    }
    auctions = auctions.filter(_auction => _auction[0].soldPrice == 0)
    console.log(auctions)
    auctions.forEach(item =>{
      this.findPrice(item.auctionNumber).then(function(result){
          item.soldPrice = result;
        })
    })
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
    this.state.testToken.methods.approve("0x6D69a4c47620e56CDbDb64E8E14AD58ada2Cc256", price).send({ from: this.state.account })
}

  async buyAuction(auction) {
    this.state.dutchAuction.methods.buyAuction(auction).send({ from: this.state.account })
}

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true,
      auctions: [],
      prices: [],
    }

    this.buyAuction = this.buyAuction.bind(this)
    this.findPrice = this.findPrice.bind(this)

  }

  render() {
    return (
      <div>        
          <Navbar account={this.state.account}/>
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
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
