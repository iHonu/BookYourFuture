import React, { useEffect, useState } from "react";
import Calendar from "../../components/DatePicker/Calendar";
import Notifications from "../../components/Student/StudentDashboard/Notifications";
import Box from "@mui/material/Box";
import { CssBaseline, Typography, Container } from "@mui/material";
import EventTable from "../../components/Student/StudentDashboard/Table";
import Grid from "@mui/material/Grid";
import useFetch from "../../hooks/useFetch";

import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function StudentDashboard() {
  function processData(responseData) {
    if (responseData.success === true) {
      const eventsData = responseData.eventsData;
      return eventsData;
    } else {
      return [];
    }
  }

  const userData = useSelector((state) => state.auth.data);
  const userId = userData ? userData._id : null;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [timeslotDeleted, setTimeslotDeleted] = useState(false);

  const { isLoading, error, performFetch } = useFetch(
    "/event/all",
    handleEventsUpdate
  );

  const renderContent = () => {
    if (isLoading) {
      return;
    } else if (error) {
      return <p>Error: {error.message}</p>;
    } else {
      return (
        <EventTable
          events={events}
          selectedDate={selectedDate}
          onTimeslotDelete={handleTimeslotDelete}
        />
      );
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    performFetch();
  };

  const handleTimeslotDelete = () => {
    setTimeslotDeleted(true);
  };

  function handleEventsUpdate(responseData) {
    const data = processData(responseData);

    const filteredEvents = data.filter((event) =>
      event.group[0]?.students.includes(userId)
    );

    const eventNotifications = filteredEvents
      .filter((event) =>
        event.sessionSlot.every(
          (slot) => !slot.student || slot.student._id !== userId
        )
      )
      .filter((event) => event.sessionSlot.some((slot) => !slot.student))
      .map((event) => ({
        message: event.title,
        type: "warning",
        id: event._id,
        action: {
          label: "Book a slot",
          link: "/student/event/timeslots",
        },
      }));

    setEvents(filteredEvents);
    setNotifications(eventNotifications);
  }

  useEffect(() => {
    performFetch();
    setTimeslotDeleted(false);
  }, [timeslotDeleted]);

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
              <Notifications notifications={notifications} />
            </Grid>
            <Grid item mt="2em" xs={12} sm={12} md={3} lg={4}>
              <Calendar
                onDateSelected={handleDateChange}
                selectedDate={selectedDate}
                eventsData={events}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={8}>
              {renderContent()}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
