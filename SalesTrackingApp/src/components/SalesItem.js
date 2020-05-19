import React, { Component } from 'react';
import './SalesItem.scss';

class DrinkOptions extends Component {

    render(){

        return (
            <form>
                <div class="container">
                    <div class="row">
                        <div class="col">{this.props.drink}</div>
                        <div class="col">{this.props.amountSold}</div>
                        <div class="col">${this.props.profits}</div>
                        <button type="button" class="btn btn-outline-danger" onClick={()=>this.props.onDelete(this.props.id,this.props.profits,this.props.drink)}>Delete Item</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default DrinkOptions;




