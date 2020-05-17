import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.scss';

function EnterSale() {
  return (
    <body>
      <div class="Welcome">
        <h1> Welcome back! </h1>
      </div>
      <div class="row justify-content-md-center">
        <div class = "buttons">
        <Link to = "/sales/form/">
        <button type="button" class="btn btn-outline-success">Enter Sale</button>
        </Link>
        </div>
        <div class = "buttons">
        <Link to = '/sales/report/'>
        <button type="button" class="btn btn-outline-primary">Sales Report</button>
        </Link>
        </div>
      </div>
  </body>
  );
}

export default EnterSale;
