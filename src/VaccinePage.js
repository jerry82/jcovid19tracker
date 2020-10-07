import React, { useEffect, useState } from "react";
import VaccineBox from "./components/VaccineBox";
import VaccineDetails from "./components/VaccineDetails";

function VaccinePage() {
  const [vaccineState, setVaccineState] = useState();
  const [vaccineData, setVaccineData] = useState();
  const [vaccineDataCache, setVaccineDataCache] = useState();
  const [selectedPhase, setSelectedPhase] = useState();

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/vaccine")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.phases && data.data) {
          setVaccineData(data.data);
          setVaccineDataCache(data.data);

          const newData = data?.phases.reverse();
          const total = newData
            .map((item) => parseInt(item.candidates))
            .reduce((prev, next) => prev + next);

          const totalPhase = { phase: "Total", candidates: total };
          newData.push(totalPhase);

          setVaccineState(newData);
        }
      });
  }, []);

  const handleOnClick = (phase) => {
    if (vaccineDataCache) {
      const cloneVaccineData = vaccineDataCache.map((item) => ({ ...item }));
      const newVaccineData = cloneVaccineData.filter((item) => {
        if (phase == "Total") return true;
        return item.trialPhase == phase;
      });
      setVaccineData(newVaccineData);
      setSelectedPhase(phase);
    }
  };

  return (
    <div className="vaccine__page">
      <div className="vaccine__page__stats">
        {vaccineState?.map((item, idx) => (
          <VaccineBox
            phase={item.phase}
            selectedPhase={selectedPhase}
            candidates={item.candidates}
            idx={idx}
            onClick={() => {
              handleOnClick(item.phase);
            }}
          />
        ))}
      </div>
      <div className="vaccine__page__details">
        <VaccineDetails vaccineData={vaccineData} />
      </div>
    </div>
  );
}

export default VaccinePage;
