import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {},
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow key={row.name}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>{row.no}</StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.candidate}
        </StyledTableCell>
        <StyledTableCell>{row.mechanism}</StyledTableCell>
        <StyledTableCell>{row.trialPhase}</StyledTableCell>
        <StyledTableCell>{row.sponsorContent}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <div>{row.details}</div>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

function VaccineDetails({ vaccineData }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Candidate</StyledTableCell>
            <StyledTableCell>Mechanism</StyledTableCell>
            <StyledTableCell>Trial Phase</StyledTableCell>
            <StyledTableCell>Sponsors</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {vaccineData?.map((row, idx) => {
            let sponsorContent = row.sponsors.join(", ");
            const newRow = {
              ...row,
              sponsorContent: sponsorContent,
              no: idx + 1,
            };
            return <Row key={row.name} row={newRow} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VaccineDetails;
