import React, { Component } from 'react';

class DrinkOptions extends Component {

    
    state = {
        item: '',
        profit: 0,
        numSales: 0

    };


    // Updates the name of the item sold as well as the total profit
    updateItemName (e) {

        this.setState({item: e.target.value});
        if (e.target.value === "Fresh Lemon Lemonade"){
            this.setState({profit: this.state.numSales * 1.5});
            this.props.onUpdate(this.props.id, 1, this.state.numSales * 1.5, "Fresh Lemon Lemonade");
        }else if (e.target.value === "Orange & Lemon Splash"){
            this.setState({profit: this.state.numSales * 2});
            this.props.onUpdate(this.props.id, 1, this.state.numSales * 2, "Orange & Lemon Splash");
        }else if (e.target.value === "Sugary Shocker"){
            this.setState({profit: this.state.numSales * 3});
            this.props.onUpdate(this.props.id, 1, this.state.numSales * 3, "Sugary Shocker");
        }else if (e.target.value === "Wild Whiskey Whack"){
            this.setState({profit: this.state.numSales * 5.5});
            this.props.onUpdate(this.props.id, 1, this.state.numSales * 5.5, "Wild Whiskey Whack");
        }
    };

    // Updates the value of how many units were sold as well as the total profit
    updateNumSales (e) {
        this.setState({numSales: e.target.value});
        if (this.state.item === "Fresh Lemon Lemonade"){
            this.setState({profit: e.target.value * 1.5});
            this.props.onUpdate(this.props.id, 1, e.target.value * 1.5, "Fresh Lemon Lemonade");
        }else if (this.state.item === "Orange & Lemon Splash"){
            this.setState({profit: e.target.value * 2});
            this.props.onUpdate(this.props.id, 1, e.target.value * 2, "Orange & Lemon Splash");
        }else if (this.state.item === "Sugary Shocker"){
            this.setState({profit: e.target.value * 3});
            this.props.onUpdate(this.props.id, 1, e.target.value * 3, "Sugary Shocker");
        }else if (this.state.item === "Wild Whiskey Whack"){
            this.setState({profit: e.target.value * 5.5});
            this.props.onUpdate(this.props.id, 1, e.target.value * 5.5, "Wild Whiskey Whack");
        }
    };

    render(){

        console.log('prop', this.props)

        return (
            <form>
                <div class="form-row">
                    <div class="col-7">
                        <label for="item_selct">Select Product</label>
                        <select onChange = {this.updateItemName.bind(this)} class="form-control" id="item_select">
                            <option>None</option>
                            <option>Fresh Lemon Lemonade</option>
                            <option>Orange & Lemon Splash</option>
                            <option>Sugary Shocker</option>
                            <option>Wild Whiskey Whack</option>
                        </select>
                    </div>
                    <div class="col">
                        <label>Number of units sold</label>
                        <input onChange = {this.updateNumSales.bind(this)}  type="text"></input>
                    </div>
                    <div class = "col">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Profit</label>
                        <div class="col-sm-10">
                            <text type="text" readonly class="form-control-plaintext" id="staticEmail" >${this.state.profit}</text>
                        </div>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-outline-danger" onClick = {() => this.props.onDelete(this.props.id, this.state.profit)}>Delete Entry</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default DrinkOptions;




