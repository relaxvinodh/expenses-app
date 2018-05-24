import React from 'react';
import {Link, browserHistory} from 'react-router';
import AddExpense from './AddExpense';
import Header from '../common/Header';

class AddSpends extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  formSubmit(data){
    let getExpense = localStorage.getItem("expense") || '[]';
    getExpense = JSON.parse(getExpense);
    getExpense.push({
      category: "spend",
      date: data.date,
      amount: data.amount,
      desc: data.desc
    });
    localStorage.setItem("expense",JSON.stringify(getExpense));
    browserHistory.push('/');
  }

  prevPage(){
    browserHistory.push('/');
  }

  render(){
    return(
      <div>
      <Header />
        <div className="container">
          <p className="spend"><i className="left" onClick={this.prevPage}></i> Add Spends</p>
          <AddExpense submitCallback={this.formSubmit}/>
        </div>
      </div>

    );
  }
}

export default AddSpends;
