import React, { Component } from 'react';

class ProfitsRow extends Component {

    render(){

        return (
            <form>
                <div class="container">
                    <div class="row">
                        <div class="col">{this.props.date}</div>
                        <div class="col">
                            <ul>
                                {this.props.items.map((item) =>{
                                    return(
                                        <li>{item}</li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div class="col">${this.props.money}</div>
                        <div class="col">${this.props.commission.toFixed(2)}</div>
                    </div>
                </div>
            </form>
        );
    }
};

export default ProfitsRow;




