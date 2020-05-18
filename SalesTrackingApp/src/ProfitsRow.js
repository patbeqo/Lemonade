import React, { Component } from 'react';

class ProfitsRow extends Component {

    render(){

        return (
            <form>
                <div class="container">
                    <div class="row">
                        <div class="col">{this.props.date}</div>
                        <div class="col">{this.props.items}</div>
                        <div class="col">${this.props.profits}</div>
                        <div class="col">${this.props.commission}</div>
                    </div>
                </div>
            </form>
        );
    }
};

export default ProfitsRow;




