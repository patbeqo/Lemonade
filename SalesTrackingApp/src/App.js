import React, { Component } from 'react';
import SalesForm from './SalesForm.js';
import ReportPage from './ReportPage.js';
import Homepage from './Homepage.js';
import  { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {appContext} from './Context'


class App extends Component {

  state = {

    forms: []    
    
  }

 
  
  render(){

    console.log(this.state.forms);

    return (
      <appContext.Provider value={{
        state: this.state,
        addNewForm: (newForm) => {
          const copyForms = this.state.forms.concat([newForm]);
          this.setState({forms: copyForms});
        }
      }}>
        <Router>
         <div className="content">
            <Switch>
             <Route path = "/sales/form/"  exact component = {SalesForm}/>
             <Route path = "/sales/report/" exact component = {ReportPage} />
             <Route path = "/" exact component = {Homepage} />
            </Switch>
         </div>
        </Router>
      </appContext.Provider>
    );
  }
}

export default App;