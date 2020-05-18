import React, { Component } from 'react';
import ProfitsTable from './ProfitsTable.js';
import './ReportPage.scss';
import {appContext} from './Context';


class ReportPage extends Component {

  Sales_data = this.props.cookies;

  state = {
    salesPerson: '',
    startTime: '',
    endTime: '',

  };


  //Function updates the Sales Person
  updateSalesPerson(e) {
    this.setState({salesPerson: e.target.value});
  };

  //Function updates lower limit
  updateStartDate(e) {
    this.setState({startTime: e.target.value});
  };

  //Function updates upper limit
  updateEndDate(e) {
    this.setState({endTime: e.target.value});
  };

  render(){

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
                      <select class="form-control" id={this.state.salesPerson === "None" ? "errorClass":"item_select"} onChange = {this.updateSalesPerson.bind(this)}>
                        <option>None</option>
                        <option>Jeff Terry</option>
                        <option>Thomas Black</option>
                        <option>John Rice</option>
                        <option>Larry Long</option>
                      </select>
                    </div>
                  </div>
                  <p1>{data.state.forms}</p1>
                  <div class="form-group">
                    <label > Start Date and Time</label>
                    <input class="form-control"  placeholder="'May 12, 2020 12:45pm'" onChange = {this.updateStartDate.bind(this)}></input>
                  </div>
                  <div class="form-group">
                    <label > End Date and Time</label>
                    <input  class="form-control" placeholder="'May 22, 2020 01:45pm'" onChange = {this.updateEndDate.bind(this)}></input>
                  </div>
                  <button type="button" class="btn btn-info">Generate Report</button>
              </form>
            </main>
          </body>
          )}
      </appContext.Consumer>
    </div>
    );
  }
}

export default ReportPage;