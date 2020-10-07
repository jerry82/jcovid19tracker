import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Paper, Tabs, Tab, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Nav() {
  const history = useHistory();
  const classes = useStyles();
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    switch (pageIdx) {
      case 0:
        history.push("/covid19data");
        break;
      case 1:
        history.push("/vaccine");
        break;
      case 2:
        history.push("/about");
        break;
      default:
        break;
    }
  }, [pageIdx]);

  return (
    <Paper className={classes.root}>
      <Tabs
        value={pageIdx}
        onChange={(event, newPageIdx) => setPageIdx(newPageIdx)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Covid-19 Data" />
        <Tab label="Vaccine" />
        <Tab label="About" />
      </Tabs>
    </Paper>
  );
}

export default Nav;
