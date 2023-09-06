import React, { useEffect, useState } from "react";
import Calendar from "../../components/DatePicker/Calendar";
import Notifications from "../../components/Student/StudentDashboard/Notifications";
import Box from "@mui/material/Box";
import { CssBaseline, Typography, Container } from "@mui/material";
import EventTable from "../../components/Student/StudentDashboard/Table";
import Grid from "@mui/material/Grid";
import useFetch from "../../hooks/useFetch";

export default function StudentDashboard() {
  function processData(responseData) {
    if (responseData.success === true) {
      const eventsData = responseData.eventsData;

      return eventsData;
    } else {
      // eslint-disable-next-line
      console.error("API response indicates an error:", responseData);
      return [];
    }
  }
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/event/all",
    handleEventsUpdate
  );

  function handleDateSelected(date) {
    setSelectedDate(date);
  }

  function handleEventsUpdate(responseData) {
    const processedEvents = processData(responseData);
    setEvents(processedEvents);
  }

  useEffect(() => {
    performFetch();
    return () => {
      cancelFetch();
    };
  }, []);

  return (
    <Container>
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                variant="h3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: "0.5em",
                }}
              >
                Your events for today
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Notifications />
            </Grid>
            <Grid item mt="2em" xs={12} sm={12} md={4} lg={5}>
              <Calendar onDateSelected={handleDateSelected} />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={7}>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : (
                <EventTable events={events} selectedDate={selectedDate} /> // Pass events and selectedDate as props
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
