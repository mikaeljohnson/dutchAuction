import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import POApng from '../star.png'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useState from 'react';
class RedeemBox extends Component {
  

    constructor(props) {
        super(props);
      
        this.state = {
            inputValueDEP: props.inputValue,
            inputValueWIT: props.inputValue,
        };
        this.handleChangeDEP = this.handleChangeDEP.bind(this);
        this.handleChangeWIT = this.handleChangeWIT.bind(this);
      };
      
      handleChangeDEP = (e) => {
        const result = e.target.value.replace(/[^0-9]/gi, '');
        this.setState({inputValueDEP: result});
      }
      handleChangeWIT = (e) => {
        const result = e.target.value.replace(/[^0-9]/gi, '');
        this.setState({inputValueWIT: result});
      }

  render() {
    
    return(
      <Container className="BankGui">
          {/* <Row md="auto">
      

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
</Row> */}
    
            <Card.Text>
                Amount: {this.props.bal}
            </Card.Text>
             <input placeholder='Auction#'   value={this.state.inputValueDEP} onChange={this.handleChangeDEP}/>
             <input placeholder='Winner Slot' value={this.state.inputValueWIT} onChange={this.handleChangeWIT}/>
             <Button variant="primary" onClick={(event) => {this.props.redeemAuction(this.state.inputValueDEP,this.state.inputValueWIT)}}>Redeem</Button>
            

        </Container>)}
}

export default RedeemBox;