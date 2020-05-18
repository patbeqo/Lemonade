import React, { Component } from 'react';

class ProfitsTable extends Component {

    render(){

        return (
            <form>
                <div class="form-row">
                    <div class="col">
                        <label>Date</label>
                        <input type="text" readonly  value={this.props.date}></input>
                    </div>
                    <div class="col">
                        <label>Items Sold</label>
                        <input type="text" readonly  value={this.props.items}></input>
                    </div>
                    <div class="col">
                        <label>Total Price</label>
                        <input type="text" readonly  value={this.props.profit}></input>
                    </div>
                    <div class="col">
                        <label>Commission Earned</label>
                        <input type="text" readonly  value={this.props.commission}></input>
                    </div>
                </div>
            </form>
        );
    }
}
export default ProfitsTable;




