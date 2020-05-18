import React, { Component, useContext } from 'react';
import './SalesForm.scss';
import DrinkOptions from './DrinkOptions.js';
import {appContext} from './Context';

class SalesForm extends Component {
  
  state = {
    salesPerson: 'None',
    dateTime: '',
    totalProfits: 0,
    itemsArray: [],
    sales: [],
    personBool: 0,
    profitsBool: 0,
    dateBool: 0,
    popBool: 0,
    invalidBool: 0,
    saveBool: 0,
    salesReportData: []
  };

  
  // Function adds a sale row
  addSale(){

    const index = this.state.sales.length
    this.setState({sales: [...this.state.sales, <DrinkOptions onDelete={this.handleDelete} onUpdate={this.updateTotalProfits} onInvalid={this.handInvalidString} id = {index} />]});
    
  };

  // Function deletes a sale row
  handleDelete = (id, profit, item) => {

    const copySales = this.state.sales;
    copySales.splice(id, 1);
    this.setState({sales: copySales});

    this.updateTotalProfits(id,0,profit,item);

  };

  //Function updates the Sales Person
  updateSalesPerson(e) {

    this.setState({salesPerson: e.target.value});

    if(e.target.value === "None"){

      this.setState({personBool: 1});

    }else{

      this.setState({personBool: 0});
    }
  };

  //Function updates the time of sale
  updateDateTime(e) {

    this.setState({dateTime: e.target.value});
    this.setState({dateBool: 0});

  };


  //To deal with updating the same sale more than once
  tmp_store = [0,0]


  //Function updates the total profits
  updateTotalProfits = (id, checker, profit, item) => {
    //Checker fo whether to add or subtract
    if (checker === 1){

      //Total Profits were edited
      this.setState({profitsBool: 0});

      if(profit !== 0){

        //updates the list of items sold if produced profits
        var i;
        var j = 0; // Checks if item is already there
        for (i =0; i<this.state.itemsArray.length; i++){

          if (this.state.itemsArray[i] = item){
            
            j = 1;

          }

        }
      
        if (j === 0){
          
          const copyItemsArray = this.state.itemsArray;
          copyItemsArray.push(item);
          this.setState({itemsArray: copyItemsArray});

        }

      }

      //When the total is at 0
      if(this.state.totalProfits === 0){

        this.setState({totalProfits: profit});
        this.state.tmp_store=[id,profit]

      }

      if(this.tmp_store[0] === id){

        //Remove the previous profit and add the new one
        var tmp_var = this.state.totalProfits;
        var tmp_var2 = this.tmp_store[1];
        this.setState({totalProfits: tmp_var - tmp_var2 + profit});
        this.tmp_store = [id, profit]

      }

      if(this.tmp_store[0] !== id){


        var tmp_var = this.state.totalProfits;
        this.setState({totalProfits: tmp_var + profit});
        this.tmp_store = [id, profit];

      }

    }else if(checker === 0) {

      //updates the list of items sold
      var i;
      for (i =0; i<this.state.itemsArray.length; i++){

        if (this.state.itemsArray[i] === item){

          const copyItemsArray = this.state.itemsArray;
          copyItemsArray.splice(i,1);
          this.setState({itemsArray: copyItemsArray})

          }

      }

      this.setState({totalProfits: this.state.totalProfits - profit});
      this.tmp_store = [0,0];

    }

  };


  

  // Function saves our data and resets the page
  saveDataFunction() {

    //Error check

    if(this.state.totalProfits === 0 || this.state.salesPerson === "None" || this.state.dateTime === "" || this.state.saveCheck === 1 || this.state.invalidBool === 1){

      if(this.state.totalProfits === 0 ){

        this.setState({profitsBool: 1});

      }

      if(this.state.salesPerson === "None"){

        this.setState({personBool: 1});

      }

      if(this.state.dateTime === ""){

        this.setState({dateBool: 1});

      }

    }else{

      //Storing Sales Form data

      const copySalesReportData = this.state.salesReportData;
      var tmp_var = this.state.itemsArray
      var tmp_var2 = this.state.totalProfits;
      var tmp_var3 = this.state.dateTime

      copySalesReportData.push(tmp_var3);
      copySalesReportData.push(tmp_var);
      copySalesReportData.push(tmp_var2);

      if(this.state.salesPerson === "Jeff Terry"){

        copySalesReportData.push(tmp_var2 * 0.1);

      }else if(this.state.salesPerson === "Thomas Black"){

        copySalesReportData.push(tmp_var2 * 0.2);

      }else if(this.state.salesPerson === "John Rice"){

        copySalesReportData.push(tmp_var2 * 0.05);

      }else if(this.state.salesPerson === "Larry Long"){

        copySalesReportData.push(0);

      }
      
      this.setState({salesReportData: copySalesReportData});

      this.setState({saveBool: 1})

      // Resets page to defualt values

      this.tmp_store=[0,0];

      const copySales = this.state.sales;
      copySales.splice(0, copySales.length);
      this.setState({sales: copySales});

      const copyItemsArray = this.state.itemsArray;
      copySales.splice(0, copyItemsArray.length);
      this.setState({itemsArray: copyItemsArray});

      this.setState({personBool: 0});
      this.setState({profitsBool: 0});
      this.setState({dateBool: 0});

      this.setState({totalProfits:0});
      this.setState({dateTime: ""});
      this.setState({salesPerson: "None"})

      //Trigger popup
      this.setState({popBool: 1});

      //Remove popup after 5 seconds
      setTimeout(
        function() {
            this.setState({popBool: 0});
        }
        .bind(this),
        5000
    );

  
    }
  };

  resetReportData(){

    const copyTmp = this.state.salesReportData;
    copyTmp.splice(0, copyTmp.length);
    this.setState({salesReportData: copyTmp});
    this.setState({saveBool: 1})

  }


  handInvalidString = (checker) =>{

    if (checker === 1 ){

      this.setState({invalidBool: 1});
    
    }else{

      this.setState({invalidBool: 0});

    }

  };


  render() {

    return (
        <div>
        <appContext.Consumer>
          {(data) => (
            <body class="Site">
              <h3 class = "title ">Sales Form</h3>
              <div class={this.state.popBool ? 'popup' : "hide"}>  
                <p>Successfully Saved !</p>  
              </div>
              <main class="Site-content">
                <form>
                  <div class="form-group row">
                    <div class="col">
                      <label>Sales Person</label>
                      <select class="form-control" id={this.state.personBool ? "errorClass":"item_select"} onChange = {this.updateSalesPerson.bind(this)} value = {this.state.salesPerson} >
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
                      <label>Date and time</label>
                      <input class="form-control" type="datetime-local" onChange={this.updateDateTime.bind(this)} id={this.state.dateBool ? "errorClass":""} value= {this.state.dateTime}></input>
                    </div>
                  </div>
                </form>
                {
                  this.state.sales.map((sale,index)=>{
                    return (
                      sale
                    )
                  })
                }
                <button type="button" class="btn btn-outline-success" onClick = {this.addSale.bind(this)}>Add Sale</button>
              </main>
            <footer class = "total-save"> 
              <div class="container">
                <div class="row">
                  <div class="col-sm">
                    <label>Total</label>
                    <p>
                    <text type="text"  id = {this.state.profitsBool? "errorClass":"item_select"} >${this.state.totalProfits}</text>
                    </p>
                  </div>
                  <div class="col-sm">
                    <button type="button" class="btn btn-info" onClick = {()=>{
                      this.saveDataFunction();
                      //if(this.state.saveBool === 1){
                        const copyOFDATA = this.state.salesReportData;
                        data.addNewForm(copyOFDATA);
                        this.resetReportData();
                     // }
                      }}>Save</button>
                  </div>
                </div>
              </div>
            </footer>
          </body>
        )}
      </appContext.Consumer>
    </div>
  );
  }
}

export default SalesForm