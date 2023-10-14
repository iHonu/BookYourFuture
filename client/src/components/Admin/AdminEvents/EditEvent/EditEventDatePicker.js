import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Chip, IconButton } from "@mui/material";
import EventContext from "../AddEvent/EventContext";
import "dayjs/locale/de";

export default function EditEventDatePicker() {
  const { eventData, setEventData } = React.useContext(EventContext);

  const handleAdd = () => {
    const newSlot = { startTime: null };
    setEventData((prev) => ({
      ...prev,
      sessionSlot: [...prev.sessionSlot, newSlot],
    }));
  };

  const handleRemove = (idToRemove) => {
    setEventData((prev) => ({
      ...prev,
      sessionSlot: prev.sessionSlot.filter((slot) => slot._id !== idToRemove),
    }));
    setEventData((prev) => ({
      ...prev,
      sessionSlot: prev.sessionSlot.filter((slot) => slot._id !== idToRemove),
    }));
  };

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <DemoContainer components={["DateTimePicker"]} sx={{ mt: 3 }}>
        {eventData.sessionSlot.map((slot, index) => (
          <Box
            key={slot._id}
            display="flex"
            flexDirection={"column"}
            gap={2}
            alignItems={"start"}
          >
            {slot.student && (
              <Chip
                label={`${slot.student.firstName} ${slot.student.lastName}`}
                sx={{ mr: 2 }}
              />
            )}

            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <DateTimePicker
                label="Pick date and time"
                value={slot.startTime}
                onChange={(date) => handleDateChange(date, index)}
                ampm={false}
                sx={{ width: "100%", mr: 2 }}
              />
              <IconButton
                color="secondary"
                onClick={() => handleRemove(slot._id)}
                disabled={eventData.sessionSlot.length === 1 || !!slot.student}
                sx={{ ml: 1 }}
              >
                <RemoveCircleOutlineIcon fontSize="large" />
              </IconButton>
              <IconButton color="primary" onClick={handleAdd} sx={{ ml: 1 }}>
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </DemoContainer>
    </LocalizationProvider>
  );
}
