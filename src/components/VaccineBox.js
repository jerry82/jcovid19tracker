import React from "react";
import { Card, Typograph, Typography } from "@material-ui/core";
import "../Vaccine.css";

function VaccineBox({ phase, candidates, idx, selectedPhase, ...props }) {
  const colorMaps = {
    0: "vaccineBox__noOfCandidate_p0",
    1: "vaccineBox__noOfCandidate_p1",
    2: "vaccineBox__noOfCandidate_p2",
    3: "vaccineBox__noOfCandidate_p3",
    4: "vaccineBox__noOfCandidate_p4",
    5: "vaccineBox__noOfCandidate_p5",
    6: "vaccineBox__noOfCandidate_p6",
  };

  return (
    <Card
      onClick={props.onClick}
      className={`vaccineBox ${
        phase == selectedPhase ? "vaccineBox--selected" : ""
      }`}
    >
      <Typography className="vaccineBox__phase">{phase}</Typography>
      <h2 className={`vaccineBox__noOfCandidate ${colorMaps[idx]}`}>
        {candidates}
      </h2>
    </Card>
  );
}

export default VaccineBox;
