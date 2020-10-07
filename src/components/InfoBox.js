import React from "react";
import { Card, Typography } from "@material-ui/core";
import "../InfoBox.css";

function InfoBox({ title, cases, cssClass, colorType, total, ...props }) {
  const cssColor = () => {
    switch (colorType) {
      case 1:
        return "infoBox__cases--green";
      case 2:
        return "infoBox__cases--gray";
      default:
        return "";
    }
  };

  return (
    <Card onClick={props.onClick} className={`infoBox ${cssClass}`}>
      <Typography className="infoBox__title" color="textSecondary">
        {title}
      </Typography>

      <h2 className={`infoBox__cases ${cssColor()}`}>{cases}</h2>
      <Typography className="infoBox__total" color="textSecondary">
        {total} Total
      </Typography>
    </Card>
  );
}

export default InfoBox;
