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
      <Container>
          <Row md="auto">
      

    {this.props.auctions.map((auction, key) => {
    return (
      <Col md="auto" key={key} className="Auction">

    <Card.Img variant="top" src={POApng} max-width="50px" max-height="50px"/>
    <Card.Body>
      <Card.Title>Auction {auction[0].auctionNumber}</Card.Title>
      <Card.Text>
        Current Price: {auction[1]}
      </Card.Text>
      <Card.Text>
        Remaining: {auction[0].remaining}
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
        </Container>)}
}

export default Auction;