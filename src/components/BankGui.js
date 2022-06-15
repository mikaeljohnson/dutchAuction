import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import POApng from '../star.png'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useState from 'react';
class BankGui extends Component {
  

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
                Amount: {this.props.bal}
            </Card.Text>
            <div>
                <input placeholder='Tokens to deposit'   value={this.state.inputValueDEP} onChange={this.handleChangeDEP}/>
                <Button variant="primary" onClick={(event) => {this.props.depositAuction(this.state.inputValueDEP)}}>Deposit funds</Button>
            </div>
            <div>
                <input placeholder='Tokens to withdraw' value={this.state.inputValueWIT} onChange={this.handleChangeWIT}/>
                <Button variant="primary" onClick={(event) => {this.props.withdrawAuction(this.state.inputValueWIT)}}>Withdraw funds</Button>
            </div>
        </container>)}
}

export default BankGui;