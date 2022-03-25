import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Employee from "./pages/employeeLogin";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route exact path="/employee" component={Employee} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
