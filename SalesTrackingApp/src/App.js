import React, { Component } from "react";
import SalesForm from "./components/SalesForm.js";
import ReportPage from "./components/ReportPage.js";
import Homepage from "./components/Homepage.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { appContext } from "./components/Context.js";

class App extends Component {
  state = {
    forms: [], // Stores data to be transferred between router pages
  };

  render() {
    return (
      <appContext.Provider
        value={{
          state: this.state,
          saveData: (person, totalProfits, time, items) => {
            //Calculates the commission
            if (person === "Jeff Terry") {
              const newCommission = totalProfits * 0.1;
              const newSalesForm = [
                person,
                time,
                items,
                totalProfits,
                newCommission,
              ];
              const copyForms = this.state.forms.concat([newSalesForm]);
              this.setState({ forms: copyForms });
            } else if (person === "Thomas Black") {
              const newCommission = totalProfits * 0.2;
              const newSalesForm = [
                person,
                time,
                items,
                totalProfits,
                newCommission,
              ];
              const copyForms = this.state.forms.concat([newSalesForm]);
              this.setState({ forms: copyForms });
            } else if (person === "John Rice") {
              const newCommission = totalProfits * 0.05;
              const newSalesForm = [
                person,
                time,
                items,
                totalProfits,
                newCommission,
              ];
              const copyForms = this.state.forms.concat([newSalesForm]);
              this.setState({ forms: copyForms });
            } else if (person === "Larry Long") {
              const newSalesForm = [person, time, items, totalProfits, 0];
              const copyForms = this.state.forms.concat([newSalesForm]);
              this.setState({ forms: copyForms });
            }
          },
        }}
      >
        <Router>
          <div className="content">
            <Switch>
              <Route path="/sales/form/" exact component={SalesForm} />
              <Route path="/sales/report/" exact component={ReportPage} />
              <Route path="/" exact component={Homepage} />
            </Switch>
          </div>
        </Router>
      </appContext.Provider>
    );
  }
}

export default App;
