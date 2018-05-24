import React from 'react';
import {Link} from 'react-router';

class AddExpense extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      desc: '',
      amount: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.target.classList.add('active');

    this.setState({
      [e.target.name]: e.target.value
    });

    this.showInputError(e.target);
  }

  handleSubmit(e) {
    e.preventDefault();


    if (!this.showFormErrors()) {
      console.log('Form is invalid: do not submit');
    } else {
      console.log('Form is valid: submit');
      console.log(this.state)
      this.props.submitCallback(this.state);
    }
  }

  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;

    inputs.forEach(input => {
      input.classList.add('active');

      const isInputValid = this.showInputError(input);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(input) {
    const name = input.name;
    const minReq = input.min;
    const maxReq = input.max;
    const validity = input.validity;
    const label = document.getElementById(`${name}Label`).textContent;
    const error = document.getElementById(`${name}Error`);

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (validity.patternMismatch) {
        error.textContent = `${label} should be atleast `+ minReq + " chars";
      } else if (validity.rangeUnderflow) {
        error.textContent = `${label} should be atleast `+ minReq;
      } else if (validity.rangeOverflow) {
        error.textContent = `${label} should not exceed `+ maxReq;
      }
      return false;
    }

    error.textContent = '';
    return true;
  }
  render(){
    return(

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <div className="form-row justify-content-center">
            <div className="form-group col-md-6">
              <label id="dateLabel">Date</label>
              <input type="date" id="amount"
                name="date"
                ref={date => this.date = date}
                value={this.state.date} onChange={this.handleChange}
                className="form-control" required/>
              <div className="error" id="dateError" />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-6">
              <label id="amountLabel">Amount</label>
              <input type="number" id="amount"
                name="amount" min="1"
                ref={amount => this.amount = amount}
                value={this.state.amount} onChange={this.handleChange}
                className="form-control" required placeholder="Enter the Amount" />
              <div className="error" id="amountError" />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-6">
              <label id="descLabel">Description</label>
              <input type="text" id="desc" name="desc" min="5"
                ref={desc => this.desc = desc}
                value={this.state.desc} onChange={this.handleChange}
                className="form-control" pattern=".{5,}" required  placeholder="Enter the Description"/>
              <div className="error" id="descError" />
            </div>
          </div>




          <div className="form-row justify-content-center">
            <div className="form-group col-md-6">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>

    );
  }
}

export default AddExpense;
