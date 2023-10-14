import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TimeSlotButtons from "./TimeSlotButton";
import PropTypes from "prop-types";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  display: "flex",
  flexDirection: "column",

  width: "480px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AccessTimeFilledIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(360deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  textAlign: "center",
}));

export default function BookTime(props) {
  return (
    <Accordion
      sx={{
        display: "flex",
        width: "500px",
        marin: "0 auto",
      }}
      expanded={props.expanded}
      onChange={props.onChange}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{props.date}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TimeSlotButtons timeSlots={props.timeSlots} />
      </AccordionDetails>
    </Accordion>
  );
}

BookTime.propTypes = {
  date: PropTypes.string,
  handleChange: PropTypes.func,
  expanded: PropTypes.bool,
  onChange: PropTypes.func,
  timeSlots: PropTypes.array.isRequired,
};
