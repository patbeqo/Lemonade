import React from 'react';
import SalesPage from './SalesPage.js';
import ReportPage from './ReportPage.js';
import Homepage from './Homepage.js';
import  { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="content">
        <Switch>
          <Route path = "/sales/form/"  exact component = {SalesPage} />
          <Route path = "/sales/report/" exact component = {ReportPage} />
          <Route path = "/" exact component = {Homepage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;