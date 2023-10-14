import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { IconButton, Box } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventContext from "./EventContext";
import { useContext } from "react";
import "dayjs/locale/de";
import { DurationDropdown } from "../AddEvent/AddEventElements";

export default function BasicDateTimePicker() {
  const [datePickers, setDatePickers] = React.useState([{ date: null }]);
  const { eventData, setEventData } = useContext(EventContext);

  const handleDateChange = (date, index) => {
    const updatedSessionSlot = [...eventData.sessionSlot];
    if (!updatedSessionSlot[index]) {
      updatedSessionSlot[index] = {};
    }
    updatedSessionSlot[index].startTime = date ? date.toDate() : null;

    // Convert duration to seconds and store it in the sessionSlot
    const durationInSeconds = Number(eventData.duration);
    updatedSessionSlot[index].durationInSeconds = durationInSeconds;

    setEventData((prev) => ({ ...prev, sessionSlot: updatedSessionSlot }));
  };

  const handleRemove = (indexToRemove) => {
    setDatePickers((prevDatePickers) =>
      prevDatePickers.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAdd = () => {
    const lastDate = datePickers[datePickers.length - 1].date;
    setDatePickers((prevDatePickers) => [
      ...prevDatePickers,
      { date: lastDate },
    ]);
  };

  function handleDropdownChange(name) {
    return (event) => {
      setEventData((prev) => ({
        ...prev,
        [name]: event.target.value,
      }));
    };
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <DurationDropdown
        value={eventData.duration}
        onChange={handleDropdownChange("duration")}
      />
      <DemoContainer components={["DateTimePicker"]} sx={{ mt: 3 }}>
        {datePickers.map((picker, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <DateTimePicker
              label="Pick date and time"
              value={picker.date}
              onChange={(date) => handleDateChange(date, index)}
              ampm={false}
              sx={{ width: "100%", mr: 2 }}
            />
            <IconButton
              color="secondary"
              onClick={() => handleRemove(index)}
              disabled={datePickers.length === 1}
              sx={{ ml: 1 }}
            >
              <RemoveCircleOutlineIcon fontSize="large" />
            </IconButton>
            <IconButton color="primary" onClick={handleAdd} sx={{ ml: 1 }}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Box>
        ))}
      </DemoContainer>
    </LocalizationProvider>
  );
}
