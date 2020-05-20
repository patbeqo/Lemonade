import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfitsRow from './ProfitsRow.js';
import './ReportPage.scss';
import {appContext} from './Context';


class ReportPage extends Component {

  Sales_data = this.props.cookies;

  state = {
    salesPerson: 'None',  //Stores which employee the report is for
    startTime: '',        //Stores the lower limit on the time range
    endTime: '',          //Stores the upper limit on the time range

    personBool: 0,        //Stores if the name entered is valid
    endBool: 0,           //Stores if the start date entered is valid
    startBool: 0,         //Stores if the end date entered is valid
    showBool: 0,          //Stores if the report should be shown or hidden 

    profits: [],          //Stores components values
    totalsCommission: 0,  //Stores the total commission of the report
    totalsProfit: 0       //Stores the total profit of the report

  };


  //Function updates the Sales Person, and highlights red if invalid
  updateSalesPerson(e) {

    this.setState({showBool: 0});

    this.setState({salesPerson: e.target.value});

    if(e.target.value === "None"){

      this.setState({personBool: 1});

    }else{

      this.setState({personBool: 0});

    }
  };


  //Function updates lower limit, and unhighlights
  updateStartDate(e) {

    this.setState({showBool: 0});
    this.setState({startTime: e.target.value});
    this.setState({startBool: 0});

  };


  //Function updates upper limit, and unhighlights
  updateEndDate(e) {

    this.setState({showBool: 0});
    this.setState({endTime: e.target.value});
    this.setState({endBool: 0});

  };


  generateReport = (salesForms) => {

    //Used to check for errors
    var tmp = 0;
    
    //Resets the report
    this.setState({
      profits: [],
      showBool: 0
    });
    
    //Used to update the total profit and commission
    let newTotalsProfit= 0
    let newTotalsCommission = 0

    //Checks for error
    if(this.state.salesPerson === "None"){

      this.setState({personBool: 1});
      tmp++;

    }

    //Checks for error
    if(this.state.startTime === ""){

      this.setState({startBool: 1});
      tmp++;
      
    }
    
    //Checks for error
    if(this.state.endTime === ""){

      this.setState({endBool: 1});
      tmp++;
      
    }

    var d1 = new Date(this.state.startTime); //Creates new Date object for start time
    var d2 = new Date(this.state.endTime); //Creates new Date object for end time


    //Checks for valid time range
    if(d1 > d2){

      this.setState({startBool: 1});
      this.setState({endBool: 1});
      tmp++;

    }


    //Sorts data for the correct info to display and displays its
    if(tmp === 0){

      this.setState({showBool: 1});
      
      salesForms.forEach((item) =>{

        //Checks for Sales by the SalesPerson
        if(item[0] === this.state.salesPerson){

          
          var d3 = new Date(item[1]); //Creates new Date object for time thats being compared

          //Sort by date
          if(d1 <= d3 && d3 <= d2){
          
            //Sorts the list of items sold to remove duplicate values
            const newItems = [...new Set(item[2])];

              //Reformatting the date
              var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              var ampm = d3.getHours() >= 12 ? "pm" : "am";
              var hour = d3.getHours() % 12;
              hour = hour >= 10 ? hour : "0" +  hour;
              var minute = d3.getMinutes() >= 10 ? d3.getMinutes() : "0" + d3.getMinutes();

              var newTime = months[d3.getMonth()] + " " + d3.getDate() + ", " + d3.getFullYear() + " " + hour + ":" + minute + ampm ;


              //Updates array of component values
              this.setState(curState => {
                const setprofits = curState.profits.concat([{ 
                  date: newTime, 
                  items: newItems,
                  money: item[3], 
                  commission: item[4] 
                }]);
                return {
                  profits: setprofits
                }
              })
              

            //Update the total Profit and commission
            newTotalsProfit  += item[3];
            newTotalsCommission += item[4];

          }
        }
      })
      

      //Update the total profit and commission
      this.setState({totalsProfit: newTotalsProfit});
      this.setState({totalsCommission: newTotalsCommission});

    }else{

      //There was an error and the report should be hidden
      this.setState({showBool: 0});

    }
  };


  render(){
    
    return (
      <div>
        <div className = "back-button">
          <Link to = "/">
            <button type="button" class="btn btn-danger">Back</button>
          </Link>
        </div>
        <appContext.Consumer>
          {(data) => (
            <div className="Site">
              <h3 className="Report-Title">Sales & Commission Report</h3>
              <main className="Site-content">
                <form>
                  <div className="form-group row">
                    <div className="col">
                      <label for="item_selct">Sales Person</label>
                      <select className="form-control" id={this.state.personBool ? "errorClass":"item_select"} onChange = {this.updateSalesPerson.bind(this)}>
                        <option>None</option>
                        <option>Jeff Terry</option>
                        <option>Thomas Black</option>
                        <option>John Rice</option>
                        <option>Larry Long</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col">
                      <label>Start Date</label>
                      <input className="form-control" type="datetime-local" onChange={this.updateStartDate.bind(this)} id={this.state.startBool ? "errorClass":""} value= {this.state.startTime}></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col">
                      <label>End Date</label>
                      <input className="form-control" type="datetime-local" onChange={this.updateEndDate.bind(this)} id={this.state.endBool ? "errorClass":""} value= {this.state.endTime}></input>
                    </div>
                  </div>
                  <button type="button" className="btn btn-info" onClick={() => {this.generateReport(data.state.forms)}}>Generate Report</button>
              </form>
              <div className={ this.state.showBool  ? "" :"hide-report"}>
                  <div className="container">
                      <div className="row">
                          <div className="col">Date</div>
                          <div className="col">Items Sold</div>
                          <div className="col">Total Price</div>
                          <div className="col">Commission Earned</div>
                      </div>
                  </div>
                  <hr></hr>
                    {
                    this.state.profits.map((profit,index)=>{
                      return (
                            <ProfitsRow 
                              date = {profit.date} 
                              items = {profit.items} 
                              money = {profit.money} 
                              commission = {profit.commission}
                              key = {index}
                            />
                      )
                    })
                  }
                  <div className="container">
                      <div className="row">
                          <div className="col">Totals</div>
                          <div className="col"></div>
                          <div className="col">${this.state.totalsProfit}</div>
                          <div className="col">${this.state.totalsCommission.toFixed(2)}</div>
                      </div>
                  </div>
                  <hr></hr>
              </div>
            </main>
          </div>
          )}
      </appContext.Consumer>
    </div>
    );
  }
}

export default ReportPage;