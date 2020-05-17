import React from 'react';
import SalesPage from './SalesPage.js';
import ReportPage from './ReportPage.js';
import Homepage from './Homepage.js';
import  { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path = "/" exact component = {Homepage} />
          <Route path = "/sales/form/"  exact component = {SalesPage} />
          <Route path = "/sales/report/" exact component = {ReportPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;