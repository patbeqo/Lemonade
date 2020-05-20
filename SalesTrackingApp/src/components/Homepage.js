import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.scss';

function EnterSale() {
  return (
    <div>
      <div className="Welcome">
        <h1> Welcome back! </h1>
      </div>
      <div className = "row">
          <div className = "column">
            <Link to = "/sales/form/">
            <button type="button" className="btn btn-outline-success" id = "button1">Enter Sale</button>
            </Link>
          </div>
          <div className = "column">
            <Link to = '/sales/report/'>
            <button type="button" className=" btn btn-outline-primary" id = "button2">Sales Report</button>
          </Link>
        </div>
      </div>
  </div>
  );
}

export default EnterSale;
