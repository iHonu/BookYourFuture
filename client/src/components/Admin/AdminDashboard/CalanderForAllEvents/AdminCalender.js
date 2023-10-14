import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Box from "@mui/material/Box";
import { CssBaseline, Container } from "@mui/material";
import EventTable from "./Table";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import useFetch from "../../../../hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";

export default function EventCalendar() {
  function processData(responseData) {
    if (responseData.success === true) {
      const eventsData = responseData.eventsData;
      return eventsData;
    } else {
      return [];
    }
  }

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  const { isLoading, error, performFetch } = useFetch(
    "/event/all",
    handleEventsUpdate
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    } else if (error) {
      return <p>Error: {error.message}</p>;
    } else {
      return <EventTable events={events} selectedDate={selectedDate} />;
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    performFetch();
  };

  function handleEventsUpdate(responseData) {
    const data = processData(responseData);

    setEvents(data);
  }

  useEffect(() => {
    performFetch();
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
          <Grid container spacing={{ xs: 0, md: 4 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Calendar
                onDateSelected={handleDateChange}
                selectedDate={selectedDate}
                eventsData={events}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              {renderContent()}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
