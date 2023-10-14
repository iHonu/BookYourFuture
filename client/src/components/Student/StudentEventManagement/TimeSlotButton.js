import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useRadioContext } from "./TimeSlotContext";
import dayjs from "dayjs";

function generateRadioButtons(buttonsData) {
  return buttonsData.map((button) => (
    <FormControlLabel
      key={button.value}
      value={button.value}
      control={
        <Radio
          icon={<Button variant="outlined">{button.label}</Button>}
          checkedIcon={<Button variant="contained">{button.label}</Button>}
        />
      }
    />
  ));
}

export default function TimeSlotButtons(props) {
  const { selectedValue, handleChange } = useRadioContext();
  const { timeSlots } = props;

  const buttonsData = timeSlots.map((slot) => {
    const durationInMinutes = slot.durationInSeconds
      ? slot.durationInSeconds / 60
      : 0;

    const startTime = dayjs(slot.startTime);
    const endTime = startTime.add(durationInMinutes, "minute");

    const label = `${startTime.format("HH:mm")}-${endTime.format("HH:mm")}`;

    return {
      value: slot._id,
      label: label,
    };
  });

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
        value={selectedValue}
        onChange={handleChange}
      >
        {generateRadioButtons(buttonsData)}
      </RadioGroup>
    </FormControl>
  );
}

TimeSlotButtons.propTypes = {
  timeSlots: PropTypes.array.isRequired,
};
