import React from 'react';
import './App.css';
import EnterSale from './EnterSale.js';
import SalesReport from './SalesReport.js';
import Homepage from './Homepage.js';
import  { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path = "/" exact component = {Homepage} />
          <Route path = "/sales/form/"  exact component = {EnterSale} />
          <Route path = "/sales/report/" exact component = {SalesReport} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;