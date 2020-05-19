import React, { Component, useContext } from 'react';
import './SalesForm.scss';
import SalesItem from './SalesItem.js';
import {appContext} from './Context';

class SalesForm extends Component {
  
  state = {
    salesPerson: 'None',    //Stores selected Employee
    dateTime: '',           //Stores time entered
    drinkSelected: 'None',  //Stores selected Drink
    numSold: 0,             //Stores number of drink sold entered
    totalProfits: 0,        //Stores the updated total profits

    sales: [],              //Stores components that need to be displayed
    items: [],              //Stores which items have been sold

    drinkSelectedBool: 0,   //Decides whether or not to highlight in red
    numSoldBool: 0,         //Decides whether or not to highlight in red
    salesPersonBool: 0,     //Decides whether or not to highlight in red 
    dateTimeBool: 0,            //Decides whether or not to highlight in red
    totalProfitsBool: 0,    //Decides whether or not to highlight in red
    
    popBool: 0,             //Decides whether or not to enable popup for 5 seconds
    salesReportData: []     //Stores data that will be needed for the Sales Report

  };


  //Function adds new sale
  addSale (){

    //Unhighlights exisisting
    this.setState({totalProfitsBool: 0});

    //Handles Errors
    var tmp = 0;

    if(isNaN(this.state.numSold) || this.state.numSold <= 0){

      this.setState({numSoldBool: 1});
      tmp++;

    }

    if(this.state.drinkSelected === "None"){

      this.setState({drinkSelectedBool: 1});
      tmp++;

    }

    //If the number of items is a valid poistive integer, and there is an item selected, Add salesForm
    if(tmp == 0){

      const currDrink = this.state.drinkSelected;
      const currAmountSold = this.state.numSold;
      var currProfits = 0;

      //Determining the amount of profits based on Drink name 
      if(currDrink === "Fresh Lemon Lemonade"){

        currProfits = currAmountSold * 1.5;

      }else if(currDrink === "Orange & Lemon Splash"){

        currProfits = currAmountSold * 2;

      }else if(currDrink === "Sugary Shocker"){

        currProfits = currAmountSold * 3;

      }else if (currDrink === "Wild Whiskey Whack"){

        currProfits = currAmountSold * 5.5;

      }

      //Updating the total Profits
      const copyTotalProfits  = this.state.totalProfits;
      const newTotalProfits = copyTotalProfits + currProfits;
      this.setState({totalProfits: newTotalProfits});

      //Adding a new component in order to be displayed, including the index in order to identify which element to delete in the future
      //this.setState({sales: [...this.state.sales, <SalesItem onDelete={this.handleDelete} id = {index} drink = {currDrink} amountSold = {currAmountSold} profits = {currProfits}/>]});
      this.setState({sales: [...this.state.sales,
          {onDelete: this.handleDelete,
           drink: currDrink,
           amountSold: currAmountSold,
           profits: currProfits }
          ]});
      
      const copyItems = this.state.items;
      copyItems.push(currDrink);
      this.setState({items: copyItems});

    }
  }


  //Function deletes sales entry from Sales Form and updates total
  handleDelete = (index_to_delete, profit_to_remove, item_to_remove) => {

    const copySales = this.state.sales;
    const newSales = copySales.filter((sale,index) => index != index_to_delete);
    this.setState({sales: newSales});

    const copyTotalProfits = this.state.totalProfits;
    const newTotalProfits = copyTotalProfits - profit_to_remove;
    this.setState({totalProfits: newTotalProfits});

    var i;
    var copyItems = this.state.items;

    for(i=0;i<copyItems.length;i++){

      if(copyItems[i] == item_to_remove){

        const newItems = copyItems.filter((item,index) => index!= i);
        this.setState({items: newItems});
        
      }
    }

  };


  //Function updates the Sales Person and unhighlight if needed
  updateSalesPerson(e) {

    this.setState({salesPerson: e.target.value});
    this.setState({salesPersonBool: 0});

  };


  //Function updates the time of sale and unhighlight if needed
  updateDateTime(e) {

    this.setState({dateTime: e.target.value});
    this.setState({dateTimeBool: 0});

  };


  //Function updates the drinkSelected and unhighlight if needed
  updateDrinkSelected(e) {

    this.setState({drinkSelected: e.target.value});
    this.setState({drinkSelectedBool: 0});
    this.setState({totalProfitsBool: 0});


  };


  //Function updates the number of items sold and unhighlight if needed
  updateNumSold(e) {

    this.setState({numSold: e.target.value});
    this.setState({numSoldBool: 0});
    this.setState({totalProfitsBool: 0});


  };


  //Function resets page if data is valid
  saveDataFunction(){

    //Handles Errors
    var tmp = 0;

    if(this.state.salesPerson === "None"){
      this.setState({salesPersonBool: 1});
      tmp ++;

    }

    if(this.state.dateTime === ""){

      this.setState({dateTimeBool: 1});
      tmp ++

    }

    if(this.state.totalProfits === 0){

      this.setState({totalProfitsBool: 1});
      tmp++;

    }


    if(tmp === 0){

      //Reset initial values and enable success popup
      
      this.setState({salesPerson: 'None'});
      this.setState({dateTime: ''});
      this.setState({drinkSelected: 'None'});
      this.setState({numSold: 0});
      this.setState({totalProfits: 0});
      this.setState({sales: []});
      this.setState({items: []});
      this.setState({drinkSelectedBool: 0});
      this.setState({numSoldBool: 0});
      this.setState({salesPersonBool: 0});
      this.setState({dateTimeBool: 0});
      this.setState({totalProfitsBool: 0});
      

      this.setState({popBool: 1});

      setTimeout(
        function() {
            this.setState({popBool: 0});
        }
        .bind(this),
        5000
      );


    }

  }


  render() {
    
    return (
        <div>
        <appContext.Consumer>
          {(data) => (
            <body class="Site">
              <h3 class = "title ">Sales Entry Form</h3>
              <div class={this.state.popBool ? 'popup' : "hide"}>  
                <p>Successfully Saved !</p>  
              </div>
              <main class="Site-content">
                <form>
                  <div class="form-group row">
                    <div class="col">
                      <label>Sales Person</label>
                      <select class="form-control" id={this.state.salesPersonBool ? "errorClass":"item_select"} onChange = {this.updateSalesPerson.bind(this)} value = {this.state.salesPerson} >
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
                      <input class="form-control" type="datetime-local" onChange={this.updateDateTime.bind(this)} id={this.state.dateTimeBool ? "errorClass":""} value= {this.state.dateTime}></input>
                    </div>
                  </div>
                </form>
                <hr></hr>
                <div class="form-group row">
                    <div class="col">
                      <label>Drink</label>
                      <select class="form-control" onChange={this.updateDrinkSelected.bind(this)} id={this.state.drinkSelectedBool ? "errorClass" : "item_select"}  value={this.state.drinkSelected} >
                        <option>None</option>
                        <option>Fresh Lemon Lemonade</option>
                        <option>Orange & Lemon Splash</option>
                        <option>Sugary Shocker</option>
                        <option>Wild Whiskey Whack</option>
                      </select>
                    </div>
                    <div class="col">
                      <label>Number of Units Sold</label>
                      <input class="form-control" onChange={this.updateNumSold.bind(this)} id={this.state.numSoldBool ? "errorClass" : "item_select"} value={this.state.numSold}></input>
                    </div>
                    <div class="col">
                      <button type="button" class="btn btn-outline-success" onClick = {this.addSale.bind(this)}>Enter Item</button>
                    </div>
                </div>
                <div class="container" id={this.state.sales.length ? "" : "hide"}>
                      <div class="row">
                          <div class="col">Item</div>
                          <div class="col">Items Sold</div>
                          <div class="col">Profits</div>
                      </div>
                  </div>
                <hr></hr>
                {
                  this.state.sales.map((sale,index)=>{
                    return (
                      <SalesItem onDelete={sale.onDelete} id = {index} drink = {sale.drink} amountSold = {sale.amountSold} profits = {sale.profits}/>
                    )
                  })
                }
              </main>
            <footer class = "total-save"> 
              <div class="container">
                <div class="row">
                  <div class="col-sm">
                    <label>Total</label>
                    <p>
                    <text type="text"  id = {this.state.totalProfitsBool? "errorClass":"item_select"} >${this.state.totalProfits}</text>
                    </p>
                  </div>
                  <div class="col-sm">
                    <button type="button" class="btn btn-info" onClick = {()=>{
                      
                     //If there are no issues continue with saving the data
                      if(this.state.totalProfits !== 0 && this.state.salesPerson !== "None" && this.state.dateTime !== ""){

                        data.saveData(this.state.salesPerson, this.state.totalProfits, this.state.dateTime, this.state.items)

                      }

                      this.saveDataFunction();

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