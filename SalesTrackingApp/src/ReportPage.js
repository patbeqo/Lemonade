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
    profits:[],
    totalsCommission: 0,
    totalsProfit: 0

  };


  addProfit = (inDate, inItems, inProfit, inCommission) => {

    console.log("hwwasdf")

    this.setState({profits: [...this.state.profits, <ProfitsRow date = {inDate} items = {inItems} profits = {inProfit}  commission = {inCommission} />]});
  
  };



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


  sortDataFunction = (dataToSort) =>{

    var i;
    const maxloop = dataToSort[1].length;
    var newItems = []

    for(i=0; i<maxloop; i++){

      if(!newItems.includes(dataToSort[2][i])){

        newItems.push([dataToSort[2][i]]);
        newItems.push("  ");

      }

    }


    this.addProfit(dataToSort[1],newItems,dataToSort[3],dataToSort[4])

    const copyTotalsProfit = this.state.totalsProfit;
    const newTotalsProfit = copyTotalsProfit + dataToSort[3];
    this.setState({totalsProfit: newTotalsProfit});

    const copyTotalsCommission = this.state.totalsCommission;
    const newTotalsCommission = copyTotalsCommission + dataToSort[4];
    this.setState({totalsCommission: newTotalsCommission});

  };


  generateReport = (salesForms) => {

    var tmp = 0;

    this.setState({profits: []});
    

    if(this.state.salesPerson === "None"){

      this.setState({personBool: 1});
      tmp++;

    }

    if(this.state.startTime === ""){

      this.setState({startBool: 1});
      tmp++;
      
    }

    if(this.state.endTime === ""){

      this.setState({endBool: 1});
      tmp++;
      
    }

    if(tmp === 0){

      this.setState({showBool: 1});

      var i = 0;
      const maxloop = salesForms.length;

      for ( i = 0; i < maxloop; i++){

        if(salesForms[i][0] === this.state.salesPerson){

          this.sortDataFunction(salesForms[i]);

        }

      }

    }else{

      this.setState({showBool: 0});
    }

  };


  render(){

    return (
      <div>
        <appContext.Consumer>
          {(data) => (
            <body class="Site">
              <h3 class="Report-Title">Sales & Commission Report</h3>
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
                  <button type="button" class="btn btn-info" onClick={() => this.generateReport(data.state.forms)}>Generate Report</button>
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
                          <div class="col">${this.state.totalsProfit}</div>
                          <div class="col">${this.state.totalsCommission}</div>
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