import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType = "cases", countryCode = "all", ...props }) {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    if (data) {
      for (let date in data[casesType]) {
        if (lastDataPoint) {
          const newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint,
          };
          lastDataPoint = data[casesType][data];
          chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
      }
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      let code = countryCode == "worldwide" ? "all" : countryCode;

      await fetch(
        `https://disease.sh/v3/covid-19/historical/${code}?lastdays=120`
      )
        .then((response) => response.json())
        .then((data) => {
          if (code !== "all") data = data.timeline;
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType, countryCode]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          height={200}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
