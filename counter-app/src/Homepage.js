import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function EnterSale() {
  return (
    <div>
    <h1> Welcome Back! </h1>
    <p>
      <Link to = "/sales/form/">
        <button type="button" class="btn btn-outline-success">Enter Sale</button>
      </Link>
      <Link to = '/sales/report/'>
      <button type="button" class="btn btn-outline-primary">Sales Report</button>
      </Link>
    </p>
  </div>
  );
}

export default EnterSale;
