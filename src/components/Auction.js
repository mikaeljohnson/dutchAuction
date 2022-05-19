import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import POApng from '../ggwt.gif'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
class Auction extends Component {
  
  render() {
    
    return(
      <Container>
          <Row md="auto">
      

    {this.props.auctions.map((auction, key) => {
    return (
      <Col md="auto" key={key}>
    <Card style={{ width: '10rem' }} key={key}>
    <Card.Img variant="top" src='../ggwt.gif' />
    <Card.Body>
      <Card.Title>Auction {auction.auctionNumber}</Card.Title>
      <Card.Text>
        Current Price: 
      </Card.Text>
      <Button variant="primary" onClick={(event) => {this.props.buyAuction(auction.auctionNumber, this.props.findPrice(auction.auctionNumber))}}>Buy Auction</Button>
    </Card.Body>
  </Card>
  </Col>
    );
  })
}
</Row>
        </Container>)}
}

export default Auction;