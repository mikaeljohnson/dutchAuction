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
    const networkData = 4 === networkId
    
    if(networkData) {
      const testToken = new web3.eth.Contract(_testToken.abi, "0x144bd70A23e198C650FfD56B1F382015c6afFF3b")
      this.setState({testToken})
      const dutchAuction = new web3.eth.Contract(_Dutch_Auction.abi, "0x12212e787019Ae72222014C47aa0F983A9DCc171")
      this.setState({dutchAuction})
      const auctionCount = await dutchAuction.methods.auctionCount().call()
      for (var i = 0; i < auctionCount; i++) {
        const auction = await dutchAuction.methods.auctions(i).call()
        this.setState({
          auctions: [...this.state.auctions, auction]
        })
      }
      this.setState({
        auctions: this.state.auctions.filter(_auction => _auction.soldPrice == 0)
      })
      console.log(this.state.auctions)

      this.setState({ loading: false })
    } else {
      window.alert('You are not connected to the Ethereum network.')
    }
  }

  async findPrice(auctionCount) {
    try{
      var price = await this.state.dutchAuction.methods.viewPrice(auctionCount).call().then(
        function(result){
          return result
        }
      )
      return price;
    }catch(error) {
      return 0;
    }
  }

  async buyAuction(auction, price) {

    this.state.testToken.methods.approve("0x12212e787019Ae72222014C47aa0F983A9DCc171", price).send({ from: this.state.account })

    this.state.dutchAuction.methods.buyAuction(auction).send({ from: this.state.account })

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
      auctions: [],
      prices: [],
    }

    this.claimNFT = this.claimNFT.bind(this)
    this.claimAndApprove = this.claimAndApprove.bind(this)
    this.buyAuction = this.buyAuction.bind(this)
    this.findPrice = this.findPrice.bind(this)

  }

  

  render() {
    return (


<div>        
    <Navbar account={this.state.account}/>
    <div style={{
      position: 'absolute', left: '50%', top: '40%',
      transform: 'translate(-50%, -50%)'
    }}>
      <Auction auctions={this.state.auctions} buyAuction={this.buyAuction} findPrice={this.findPrice} />
        
</div>
        {/* { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Router>
            <Switch>
            <Route path="/" exact render={() => <Auction
              
            />}/>
            </Switch>
            </Router>
        }
      */}
      </div> 





    //   <div>
    //     <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    //       <a
    //         className="navbar-brand col-sm-3 col-md-2 mr-0"
    //         href=""
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Gigawatt Founders NFT Launch
    //       </a>
    //     </nav>
    //     <div className="container-fluid mt-5">
    //       <div className="row">
    //         <Auction role="Auction" className="col-lg-12 d-flex text-center">
              
    //           <div className="content mr-auto ml-auto">
               
    //               <img src={gif} className="App-logo" alt="logo" />
               
                
    //             <h1>Gigawatt Founders NFTs</h1>
    //             <p>
    //               Follow the buttons to receive your Founders NFT, please only click button 2 after confirming the first 2 transactions
    //             </p>
    //             <button       style={{height: '30px', width : '200px'}}


    //                   onClick={(e) => {
    //                     e.preventDefault();
    //                     this.claimAndApprove();
                        
    //                   }}
    //                   ></button> 
                
    //                 <button     style={{height: '30px', width : '200px'}}

    //                   onClick={(e) => {
    //                     e.preventDefault();
    //                     this.claimNFT();
                        
    //                   }}
    //                   ></button> 
    //           </div>
              
    //         </Auction>
    //       </div>
    //     </div>
    //   </div>

    
    );
  }
}

export default App;
