import React, { Component } from 'react';
import SalesFrom from './SalesForm.js';


class SalesPage extends Component {

  state = {
    salesForms: []
  };

  // Function adds a new salesForm
  addSalesForm(name, date, profits, items){

    var commision = 0
    
    if ( name == "Jeff Terry"){
      commision =  profits * 0.1;
    }else if ( name == "Thomas Black"){
      commision =  profits * 0.2;
    }else if (name == "John Rice"){
      commision =  profits * 0.05;
    }else if (name == "Larry Long"){
      commision =  0;
    }
    
    const old_arry = this.state.salesForms;
    this.setState({salesFroms: old_arry.push([date, items, profits, commision])});

  };



 render(){

    return (
      <body>
        <h1> Sales page </h1>
        < SalesFrom onSave={this.addSalesForm}/>
      </body>
    );
    
  }
    
};

export default SalesPage