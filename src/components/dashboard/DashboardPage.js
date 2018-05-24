import React from 'react';
import {Link} from 'react-router';
import Header from '../common/Header';

const NoItemsContainer = (props) =>{
  return(
    <div className="errorText">
      <p>No Items, Please add spends</p>
    </div>
  );
};

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          "store": [],
          noItems:false
    };
    this.delExpense = this.delExpense.bind(this);
  }
    componentDidMount(){
      let {store} = this.state;
      let getExpense = localStorage.getItem("expense") || '[]';
      getExpense = JSON.parse(getExpense);
      if(getExpense && getExpense.length){

        this.setState({
          store: getExpense,
          noItems: false
        });
      }
      else if(store.length == 0){
        this.setState({
          noItems: true
        })
      }
    };




    delExpense(e){
      let store = this.state.store;
      store.splice(e.currentTarget.dataset.row, 1);
      this.setState({store});
      if(store.length == 0){
        this.setState({
          noItems: true
        })
      }
      localStorage.setItem("expense",JSON.stringify(store));
    }


  render(){
    let {store, noItems} = this.state;
    let expenseItems = store && store.map((item,i) => {
      if(item){
        return (
            <tr className="border_bottom" key={i+1} id={'row'+i}>
              <td>
                <small>{item.date}</small>
                <p className={"font-weight-bold "+ (item.category)}>{item.amount}</p>
              </td>
              <td className="desc">{item.desc}</td>
              <td className="delete"><a href="#" onClick={this.delExpense} data-row={i}><img alt="delete" title="delete" src={require('../../delete.svg')}  /></a></td>
            </tr>
        );
      }
    });

    return(
      <div>
      <Header props={store}/>
      <div className="container">
        <table className="data-table">
          <tbody>
            {expenseItems}
          </tbody>
        </table>
        {noItems && <NoItemsContainer />}
        <div id="submit" className="panel-footer row justify-content-center mt-4">
            <div className="col-xs-6 text-left mr-4">
              <Link to="addincome" className="btn btn-success btn-sm">Add Income</Link>
            </div>
            <div className="col-xs-6 text-right">
              <Link to="addspends" className="btn btn-danger btn-sm">Add Spending</Link>
            </div>
          </div>
      </div>
    </div>
    );
  }
}

export default DashboardPage;
