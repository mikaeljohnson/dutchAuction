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
      <container className="BankGui">
    
            <Card.Text>
                Amount: N/A
            </Card.Text>
             <input placeholder='Auction#'   value={this.state.inputValueDEP} onChange={this.handleChangeDEP}/>
             <input placeholder='Winner Slot' value={this.state.inputValueWIT} onChange={this.handleChangeWIT}/>
             <Button variant="primary" onClick={(event) => {this.props.redeemAuction(this.state.inputValueDEP,this.state.inputValueWIT)}}>Redeem</Button>
            

        </container>)}
}

export default RedeemBox;