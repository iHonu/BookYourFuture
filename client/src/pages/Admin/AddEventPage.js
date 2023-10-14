import React from "react";
import MainEventInfo from "../../components/Admin/AdminEvents/AddEvent/AddEventInfo";
import {
  Grid,
  Container,
  Typography,
  Stack,
  Box,
  Snackbar,
} from "@mui/material";
import EventContext from "../../components/Admin/AdminEvents/AddEvent/EventContext";
import { useState } from "react";
import AddEventDatePicker from "../../components/Admin/AdminEvents/AddEvent/AddEventDatePicker";
import AddEventButton from "../../components/Admin/AdminEvents/EventElements/AddButton";
import CancelButton from "../../components/Admin/AdminEvents/EventElements/CancelButton";
// import { useSelector } from "react-redux";
// import { selectorIsAuth } from "../../components/redux/authSlice";
// import { useNavigate } from "react-router-dom";

export default function AddEventPage() {
  // const isAuth = useSelector(selectorIsAuth);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    receiverType: "",
    group: "",
    student: "",
    sessionSlot: [],
  });
  // const navigate = useNavigate();

  const [message, setMessage] = useState("");

  // if (!isAuth) {
  //   return navigate("/login");
  // }

  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      <Container>
        <Typography variant="h3" sx={{ pt: 4, mb: 5, mt: 2 }}>
          Add Event
        </Typography>
        <Grid container>
          <Grid item xs={12} md={5}>
            <MainEventInfo />
          </Grid>
          <Grid item xs={false} md={2}></Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ minHeight: { sx: "30px", md: "500px" } }}>
              <AddEventDatePicker />
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={4}
          sx={{ mt: 6 }}
        >
          <AddEventButton
            eventData={eventData}
            onEventAdded={setMessage}
            endpoint="/event/add"
            redirectPath="/events"
            buttonLabel="Add Event"
          />
          <CancelButton endpoint="/events" />
        </Stack>
      </Container>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        message={message}
      />
    </EventContext.Provider>
  );
}
