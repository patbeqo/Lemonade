import React, { Component } from 'react';
import './SalesForm.scss';
import DrinkOptions from './DrinkOptions.js';


class SalesForm extends Component {

  state = {
    salesPerson: 'None',
    dateTime: '',
    totalProfits: 0,
    itemsArray: [],
    sales: [],
    personBool: 0,
    profitsBool: 0,
    dateBool: 0
  };

  
  // Function adds a sale row
  addSale(){
    const index = this.state.sales.length
    this.setState({sales: [...this.state.sales, <DrinkOptions onDelete={this.handleDelete} onUpdate={this.updateTotalProfits} id = {index}/>]});
  };

  // Function deletes a sale row
  handleDelete = (id, profit, item) => {
    let copySales = this.state.sales;
    copySales.splice(id, 1);
    console.log(copySales)
    this.setState({sales: copySales});
    this.updateTotalProfits(id,0,profit,item);
  };

  //Function updates the Sales Person
  updateSalesPerson(e) {
    this.setState({salesPerson: e.target.value});
    if(e.target.value == "None"){
      this.setState({personBool: 1});
    }else{
      this.setState({personBool: 0});
    }
  };

  //Function updates the time of sale
  updateDateTime(e) {
    this.setState({dateTime: e.target.value});
    if(e.target.value == ""){
      this.setState({dateBool: 1})
    }else{
      this.setState({dateBool: 0})
    }
  };

  //To deal with updating the same sale more than once
  tmp_store = [0,0]

  //Function updates the total profits
  updateTotalProfits = (id, checker, profit, item) => {
    //Checker fo whether to add or subtract
    if (checker === 1){
      this.setState({profitsBool: 0});

      //updates the list of items sold
      var i;
      var j = 0;
      for (i =0; i<this.state.itemsArray.length; i++){
          if (this.state.itemsArray[i] == item){
              j = 1;
          }
      }

      if (j == 0){
        const copyItemsArray = this.state.itemsArray;
        copyItemsArray.push(item);
        this.setState({itemsArray: copyItemsArray});
      }

      if(this.state.totalProfits == 0){
        console.log(profit)
        this.setState({totalProfits: profit});
        this.state.tmp_store=[id,profit]
      }
      //To deal with updating the same sale more than once
      if(this.tmp_store[0] == id){
        //Remove the previous profit and add the new one
        var tmp_var = this.state.totalProfits;
        var tmp_var2 = this.tmp_store[1];
        this.setState({totalProfits: tmp_var - tmp_var2 + profit});
        this.tmp_store = [id, profit]
      }else{
        var tmp_var = this.state.totalProfits;
        this.setState({totalProfits: tmp_var + profit});
        this.tmp_store = [id, profit];
      }
    }else {
        //updates the list of items sold
        var i;
        for (i =0; i<this.state.itemsArray.length; i++){
            if (this.state.itemsArray[i] == item){
                const copyItemsArray = this.state.itemsArray;
                copyItemsArray.splice(i,1);
                this.setState({itemsArray: copyItemsArray})
            }
        }
        this.setState({totalProfits: this.state.totalProfits - profit});
        if((this.state.totalProfits - profit) == 0){
          this.setState({profitsBool: 1});

        }
    }    
  };

  // Function saves our data and resets the page
  saveDataFunction() {
    //Error check
    if(this.state.totalProfits == 0 || this.state.salesPerson == "None" || this.state.dateTime == ""){
      if(this.state.totalProfits == 0 ){
        this.setState({profitsBool: 1})
      }
      if(this.state.salesPerson == "None"){
        this.setState({personBool: 1});
      }
      if(this.state.dateTime == ""){
        this.setState({dateBool: 1})
      }
    }else{
      //Success procedure 



      // Calls function to add to array of data
      this.props.onSave(this.state.salesPerson, this.state.dateTime, this.state.totalProfits, this.state.itemsArray)
      // Resets page to defualt 
      this.setState({totalProfits: 0});
      this.setState({sales: []});
    }
  };

  render() {
    


    return (
      <body class="Site">
        <h3 class = "title ">Sales Form</h3>
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
            <div class="form-group">
              <label for="exampleInputEmail1">Date and Time</label>
              <input type="email" class="form-control" id={this.state.dateBool ? "errorClass":"item_select"} aria-describedby="emailHelp" placeholder="'May 12, 2020 12:45pm'" onChange = {this.updateDateTime.bind(this)}></input>          </div>
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
              <button type="button" class="btn btn-outline-info" onClick = {this.saveDataFunction.bind(this)}>Save</button>
            </div>
          </div>
        </div>
      </footer>
    </body>
  );
  }
}

export default SalesForm