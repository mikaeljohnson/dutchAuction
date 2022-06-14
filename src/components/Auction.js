import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import POApng from '../star.png'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useState from 'react';
class Auction extends Component {
  
  render() {
    
    return(
      <Container>
          <Row md="auto">
      

    {this.props.auctions.map((auction, key) => {
    return (
      <Col md="auto" key={key}>
    <Card style={{ width: '10rem' }} key={key}>
    <Card.Img variant="top" src={POApng} />
    <Card.Body>
      <Card.Title>Auction {auction[0].auctionNumber}</Card.Title>
      <Card.Text>
        Current Price: {auction[1]}
      </Card.Text>
      <Card.Text>
        Remaining: {auction[0].remaining}
      </Card.Text>
      <Button variant="primary" onClick={(event) => {this.props.buyAuction(auction[0].auctionNumber)}}>Buy Auction</Button>
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