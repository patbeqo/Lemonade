import React, { Component } from 'react';

class ProfitsTable extends Component {

    render(){

        return (
            <form>
                <div class="form-row">
                    <div class="col">
                        <label>Date</label>
                        <input type="text" readonly  value="date"></input>
                    </div>
                    <div class="col">
                        <label>Items Sold</label>
                        <input type="text" readonly  value="item, item, ..."></input>
                    </div>
                    <div class="col">
                        <label>Total Price</label>
                        <input type="text" readonly  value="number"></input>
                    </div>
                    <div class="col">
                        <label>Commission Earned</label>
                        <input type="text" readonly  value="number"></input>
                    </div>
                </div>
            </form>
        );
    }
}
export default ProfitsTable;




