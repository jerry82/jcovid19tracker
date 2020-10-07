import React from "react";
import "./App.css";

function AboutPage() {
  return (
    <div className="about__page">
      <div className="about__page__content">
        <h1>
          Developed by <strong>Jerry Nguyen</strong> as a pet project for
          learning ReactJS - email: jerrymobileapp@gmail.com
        </h1>
        <h1>
          (***All the data is retrieved from @disease.sh, use it at your own
          risk***)
        </h1>
        <ul>
          <li>
            <b>GUI:</b> @material-ui/core https://material-ui.com/
          </li>
          <li>
            <b>Charting:</b> react-chartjs-2
            https://openbase.io/js/react-chartjs-2
          </li>
          <li>
            <b>API:</b> disease.sh - Open Disease Data https://disease.sh//
          </li>
          <li>
            <b>Map:</b> Leaflet an open-source iteractive maps
            https://leafletjs.com/
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
