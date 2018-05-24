import React, {PropTypes} from 'react';
import {Link, browserHistory}  from 'react-router';

class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state={
        balance:'',
        income:'',
        spend:''
      }
    };



  //update the component once the dom is added
  componentDidMount(){
    this.updateComponent();
  };
  //whenever it recieves some props update the component
  componentWillReceiveProps(props) {
    this.updateComponent();
  }

  //method to update component from the localStorage
  updateComponent(){
    let getExpense = localStorage.getItem("expense") || "[]";
    let income = 0;
    let spend = 0;
    getExpense = JSON.parse(getExpense);
    getExpense.forEach(function(v,i,a){
      if(v.category == 'income')
        income += Number(v.amount);
      if(v.category == 'spend')
        spend += Number(v.amount);
    });

    this.setState({
      income,
      spend,
      balance: income-spend
    });
  }


  render(){
    let {balance, income, spend} = this.state;
    return(
      <header className="container">
        <small className="bal">Balance</small>
        <h4 className="text-dark">{balance} INR</h4>
        <small className="income">Income: {income} INR</small>
        <small className="spend">Spendings: {spend} INR</small>
      </header>

    );
  }
}

export default Header;
