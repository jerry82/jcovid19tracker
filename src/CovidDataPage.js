import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import { sortData, prettyPrintStat } from "./util";
import "leaflet/dist/leaflet.css";

function CovidDataPage() {
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("worldwide");
  const [countryName, setCountryName] = useState("Worldwide");
  const [countryFlag, setCountryFlag] = useState();

  const [countryInfo, setCountryInfo] = useState();
  const [tableData, setTableData] = useState();
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("setCountryInfo");
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then(
        (data) => {
          const countries = data.map((item) => {
            return {
              name: item.country,
              value: item.countryInfo.iso2,
            };
          });

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode == "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryCode(countryCode);
        setCountryInfo(data);

        if (data.country) {
          setCountryName(data.country);
        } else {
          setCountryName("Worldwide");
          setCountryFlag(null);
        }

        if (data.countryInfo) {
          setCountryFlag(data.countryInfo.flag);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
      });
  };

  return (
    <div className="covid__page">
      <div className="covid__page__left">
        <div className="covid__page__header">
          <div className="covid__page__header__countryInfo">
            <h4>{countryName}</h4>
            <div
              className="covid__page__header__countryInfo__flag"
              style={countryFlag && { backgroundImage: `url(${countryFlag})` }}
            />
          </div>

          <span> Updated at: {new Date().toLocaleString()}</span>
          <FormControl className="covid__page__dropdown" size="small">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={countryCode}
            >
              <MenuItem kye="worldwide" value="worldwide">
                Worldwide
              </MenuItem>
              {countries?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="covid__page__stats">
          <InfoBox
            colorType={0}
            cssClass={casesType === "cases" && "infoBox__cases--selected"}
            onClick={(e) => setCasesType("cases")}
            title="Today Cases:"
            cases={prettyPrintStat(countryInfo?.todayCases)}
            total={prettyPrintStat(countryInfo?.cases)}
          />
          <InfoBox
            colorType={1}
            cssClass={
              casesType === "recovered" && "infoBox__recovered--selected"
            }
            onClick={(e) => setCasesType("recovered")}
            title="Today Recovered:"
            cases={prettyPrintStat(countryInfo?.todayRecovered)}
            total={prettyPrintStat(countryInfo?.recovered)}
          />
          <InfoBox
            colorType={2}
            cssClass={casesType === "deaths" && "infoBox__deaths--selected"}
            onClick={(e) => setCasesType("deaths")}
            title="Today Fatal Cases:"
            cases={prettyPrintStat(countryInfo?.todayDeaths)}
            total={prettyPrintStat(countryInfo?.deaths)}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
        <h3 className="covid__page_graphTitle">
          {countryName} - new {casesType} (last 120 days)
        </h3>
        <LineGraph
          className="covid__page__graph"
          casesType={casesType}
          countryCode={countryCode}
        />
      </div>
      <Card className="covid__page__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default CovidDataPage;
