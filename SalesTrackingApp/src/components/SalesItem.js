import React, { Component } from 'react';
import './SalesItem.scss';

class DrinkOptions extends Component {

    render(){

        return (
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col">{this.props.drink}</div>
                        <div className="col">{this.props.amountSold}</div>
                        <div className="col">${this.props.profits}</div>
                        <button type="button" className="btn btn-outline-danger" onClick={()=>this.props.onDelete(this.props.id,this.props.profits,this.props.drink)}>Delete Item</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default DrinkOptions;




