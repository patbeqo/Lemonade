import React, { Component } from 'react';
import ProfitsRow from './ProfitsRow.js';
import './ReportPage.scss';
import {appContext} from './Context';


class ReportPage extends Component {

  Sales_data = this.props.cookies;

  state = {
    salesPerson: 'None',
    startTime: '',
    endTime: '',
    personBool: 0,
    endBool: 0,
    startBool: 0,
    showBool: 0,
    profits:[]

  };


  addProfit = (inDate, inItems, inProfit, inCommission) => {

    this.setState({profits: [...this.state.profits, <ProfitsRow date = {inDate} items = {inItems} profits = {inProfit}  commission = {inCommission} />]});
  
  };

  sortFunction(){
        
    //Will repeadetly call addProfit function

  }


  //Function updates the Sales Person
  updateSalesPerson(e) {

    this.setState({showBool: 0});

    this.setState({salesPerson: e.target.value});

    if(e.target.value === "None"){

      this.setState({personBool: 1});

    }else{

      this.setState({personBool: 0});

    }
  };


  //Function updates lower limit
  updateStartDate(e) {

    this.setState({showBool: 0});
    this.setState({startTime: e.target.value});
    this.setState({startBool: 0});

  };


  //Function updates upper limit
  updateEndDate(e) {

    this.setState({showBool: 0});
    this.setState({endTime: e.target.value});
    this.setState({endBool: 0});

  };


  generateReport() {

    if(this.state.salesPerson === "None" || this.state.startTime === "" || this.state.endTime === ""){

      this.setState({showBool: 0});

      if(this.state.salesPerson === "None"){

        this.setState({personBool: 1})

      }

      if(this.state.startTime === ""){

        this.setState({startBool: 1})
        
      }

      if(this.state.endTime === ""){

        this.setState({endBool: 1})
        
      }

    }else{

      this.setState({showBool: 1});

    }

  };


  render(){

    console.log(this.state.showBool);

    return (
      <div>
        <appContext.Consumer>
          {(data) => (
            <body class="Site">
              <h3 class="Report-Title">Sales Report</h3>
              <main class="Site-content">
                <form>
                  <div class="form-group row">
                    <div class="col">
                      <label for="item_selct">Sales Person</label>
                      <select class="form-control" id={this.state.personBool ? "errorClass":"item_select"} onChange = {this.updateSalesPerson.bind(this)}>
                        <option>None</option>
                        <option>Jeff Terry</option>
                        <option>Thomas Black</option>
                        <option>John Rice</option>
                        <option>Larry Long</option>
                      </select>
                    </div>
                  </div>
                  <p1>{data.state.forms}</p1>
                  <div class="form-group row">
                    <div class="col">
                      <label>Start Date</label>
                      <input class="form-control" type="datetime-local" onChange={this.updateStartDate.bind(this)} id={this.state.startBool ? "errorClass":""} value= {this.state.startTime}></input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col">
                      <label>End Date</label>
                      <input class="form-control" type="datetime-local" onChange={this.updateEndDate.bind(this)} id={this.state.endBool ? "errorClass":""} value= {this.state.endTime}></input>
                    </div>
                  </div>
                  <button type="button" class="btn btn-info" onClick={this.generateReport.bind(this)}>Generate Report</button>
              </form>
              <div class={ this.state.showBool  ? "" :"hide-report"}>
                  <div class="container">
                      <div class="row">
                          <div class="col">Date</div>
                          <div class="col">Items Sold</div>
                          <div class="col">Total Price</div>
                          <div class="col">Commission Earned</div>
                      </div>
                  </div>
                  <hr></hr>
                    {
                    this.state.profits.map((profit,index)=>{
                      return (
                        profit
                      )
                    })
                  }
                  <div class="container">
                      <div class="row">
                          <div class="col">Totals</div>
                          <div class="col"></div>
                          <div class="col">$dollars</div>
                          <div class="col">$a dolla</div>
                      </div>
                  </div>
                  <hr></hr>
              </div>
            </main>
          </body>
          )}
      </appContext.Consumer>
    </div>
    );
  }
}

export default ReportPage;