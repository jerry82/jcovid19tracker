import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./components/Nav";
import CovidDataPage from "./CovidDataPage";
import VaccinePage from "./VaccinePage";
import AboutPage from "./AboutPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <Route path="/" component={App}>
          <Route path="/covid19data" exact component={CovidDataPage} />
          <Route path="/vaccine" exact component={VaccinePage} />
          <Route path="/about" exact component={AboutPage} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
