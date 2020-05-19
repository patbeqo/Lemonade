import React, { Component } from 'react';

class ProfitsRow extends Component {

    render(){

        return (
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col">{this.props.date}</div>
                        <div className="col">
                            <ul>
                                {this.props.items.map((item) =>{
                                    return(
                                        <li>{item}</li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                        <div className="col">${this.props.money}</div>
                        <div className="col">${this.props.commission.toFixed(2)}</div>
                    </div>
                </div>
            </form>
        );
    }
};

export default ProfitsRow;




