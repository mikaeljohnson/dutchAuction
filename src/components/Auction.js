import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import POApng from '../star.png'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useState from 'react';
class Auction extends Component {
  

  constructor(props) {
    super(props);
  
    this.state = {
        inputValue: props.inputValue,
    };
    this.handleChange = this.handleChange.bind(this);

  };
  
  handleChange = (e) => {
    const result = e.target.value.replace(/^[a-zA-Z]{43,100}$/gi, ''); //TODO FIX LOGIC
    this.setState({inputValue: result});
  }


  render() {

    return(
      <container className="AuctionBOX">
          <Row>
      

    {this.props.auctions.map((auction, key) => {
    return (
      <Col key={key} className="Auction">

    <Card.Img variant="top" src={POApng} max-width="50px" max-height="50px"/>
    <Card.Body>
      <Card.Title>Auction {auction[0].auctionNumber}</Card.Title>
      <Card.Text>
        Auction Name: {auction[0].auctionIdentifier}
      </Card.Text>
      <Card.Text>
        Current Price: {auction[1]} | Min price: {auction[0].minPrice}
      </Card.Text>
      <Card.Text>
        Remaining: {auction[0].remaining} / {auction[0].spots}
      </Card.Text>
    </Card.Body>
      <div className="Buybox">
        <input placeholder='Enter the address you want whitelisted' value={this.state.inputValue} onChange={this.handleChange}/>
        <Button variant="primary" onClick={(event) => {this.props.buyAuction(auction[0].auctionNumber, this.state.inputValue)}}>Buy Auction</Button>
        </div>
  </Col>
    );
  })
}
</Row>
        </container>)}
}

export default Auction;