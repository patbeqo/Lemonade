import React, { Component } from 'react';
import SalesPage from './SalesPage.js';
import ProfitsTable from './ProfitsTable.js';
import './ReportPage.scss';

class ReportPage extends Component {

  state = {
    salesPerson: '',
    startTime: '',
    endTime: ''
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
            <div class="form-group">
              <label for="exampleInputEmail1"> Start Date and Time</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="'May 12, 2020 12:45pm'" onChange = {this.updateStartDate.bind(this)}></input>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1"> End Date and Time</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="'May 12, 2020 12:45pm'" onChange = {this.updateEndDate.bind(this)}></input>
            </div>
            <button type="button" class="btn btn-info">Generate Report</button>
        </form>
      </main>
    </body>
    );
  }
}

export default ReportPage;