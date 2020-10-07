import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Covid-19 Data</Link>
          </li>
          <li>
            <Link to="/vaccine">Vaccine</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
