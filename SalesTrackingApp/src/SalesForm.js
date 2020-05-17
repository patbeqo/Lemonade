import React, { Component } from 'react';
import './SalesForm.css';
import DrinkOptions from './DrinkOptions.js';


class SalesForm extends Component {

  state = {
    salesPerson: '',
    dateTime: '',
    totalProfits: 0,
    itemsArray: [],
    sales: []
  };

  
  // Function adds a sale row
  addSale(){
    this.setState({sales: [...this.state.sales, ""]});
  };

  // Function deletes a sale row
  handleDelete = (id, profit, item) => {
    console.log(id)
    let copySales = this.state.sales;
    copySales.splice(id, 1);
    console.log(copySales)
    this.setState({sales: copySales});
    this.updateTotalProfits(id,0,profit,item);
  };

  //Function updates the Sales Person
  updateSalesPerson(e) {
    this.setState({salesPerson: e.target.value});
  };

  //Function updates the time of sale
  updateDateTime(e) {
    this.setState({dateTime: e.target.value});
  };

  //To deal with updating the same sale more than once
  tmp_store = [0,0]

  //Function updates the total profits
  updateTotalProfits = (id, checker, profit, item) => {
    //Checker fo whether to add or subtract
    if (checker === 1){
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
        var i;
        for (i =0; i<this.state.itemsArray.length; i++){
            if (this.state.itemsArray[i] == item){
                const copyItemsArray = this.state.itemsArray;
                copyItemsArray.splice(i,1);
                this.setState({itemsArray: copyItemsArray})
            }
        }
        this.setState({totalProfits: this.state.totalProfits - profit});
    }
  };

  // Function saves our data and resets the page
  saveDataFunction() {
    // Calls function to add to array of data
    this.props.onSave(this.state.salesPerson, this.state.dateTime, this.state.totalProfits, this.state.itemsArray)
    // Resets page to defualt 
    this.setState({totalProfits: 0});
    this.setState({sales: []});
  };

  render() {
    


    return (
      <body class="Site">
        <h3>Sales Form</h3>
        <main class="Site-content">
          <form>
            <div class="form-group row">
              <div class="col">
                <label for="item_selct">Sales Person</label>
                <select class="form-control" id="item_select" onChange = {this.updateSalesPerson.bind(this)}>
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
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="'May 12, 2020 12:45pm'" onChange = {this.updateDateTime.bind(this)}></input>          </div>
          </form>
          {
            this.state.sales.map((sales,index)=>{
              return (
                <DrinkOptions onDelete={this.handleDelete} onUpdate={this.updateTotalProfits} id = {index} />
              )
            })
          }
          <button type="button" class="btn btn-outline-success" onClick = {(e) =>  this.addSale(e)}>Add Sale</button>
        </main>
      <footer class = "total-save"> 
        <div class="form-group row">
          <div class = "col-9">
            <label for="staticEmail" class="col-sm-2 col-form-label">Total</label>
            <div class="col-sm-10">
                <text type="text" readonly class="form-control-plaintext" id="staticEmail" >{this.state.totalProfits}</text>
            </div>
          </div>
            <div class="col">
              <button type="button" class="btn btn-outline-info" onClick = {this.saveDataFunction.bind(this)}>Save</button>
            </div>
        </div>
      </footer>
    </body>
  );
  }
}

export default SalesForm