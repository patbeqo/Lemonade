import React from 'react';
import { Link } from 'react-router-dom';

function EnterSale() {
  return (
    <body class="Site">
    <h1> Welcome Back! </h1>
    <main class="Site-content">
      <Link to = "/sales/form/">
        <button type="button" class="btn btn-outline-success">Enter Sale</button>
      </Link>
      <Link to = '/sales/report/'>
      <button type="button" class="btn btn-outline-primary">Sales Report</button>
      </Link>
    </main>
  </body>
  );
}

export default EnterSale;
