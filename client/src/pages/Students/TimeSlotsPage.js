import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import BookTime from "../../components/Student/StudentEventManagement/BookTime";
import Typography from "@mui/material/Typography";
import Button from "../../components/Student/StudentEventManagement/ConfirmEventButton";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import formatDate from "../../components/Student/StudentEventManagement/FormatDate";
import { Snackbar } from "@mui/material";
import { useRadioContext } from "../../components/Student/StudentEventManagement/TimeSlotContext";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function TimeSlotsPage() {
  const { eventName } = useRadioContext();
  const [expanded, setExpanded] = useState(null);
  const [message, setMessage] = useState("");
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
  });
  const [sessionSlots, setSessionSlots] = useState([]);
  const [sessionSlotId, setSessionSlotId] = useState([]);

  const { isLoading, error, performFetch } = useFetch("/event/all", (data) => {
    if (data.success && data.eventsData.length > 0) {
      const matchingEvent = data.eventsData.find(
        (event) => event._id === eventName
      );

      if (
        matchingEvent &&
        matchingEvent.sessionSlot &&
        matchingEvent.sessionSlot.length > 0
      ) {
        setSessionSlots(matchingEvent.sessionSlot);
        setSessionSlotId(matchingEvent.sessionSlot[0]._id);
      }
      setEventData({
        eventName: matchingEvent ? matchingEvent.title : "",
        description: matchingEvent ? matchingEvent.description : "",
      });
    }
  });

  useEffect(() => {
    performFetch();
  }, [eventName]);

  const groupedTimeSlots = {};

  sessionSlots.forEach((slot) => {
    const date = formatDate(slot.startTime);
    if (!groupedTimeSlots[date]) {
      groupedTimeSlots[date] = [];
    }
    groupedTimeSlots[date].push(slot);
  });

  const handleAccordionChange = (panel) => {
    setExpanded(panel === expanded ? null : panel);
  };

  return (
    <>
      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                mt={"1em"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {eventData.eventName}
              </Typography>
              <Typography
                variant="subtitle1"
                mt={"2em"}
                sx={{ textAlign: "center" }}
              >
                {eventData.description}
              </Typography>
            </Grid>
            {Object.entries(groupedTimeSlots).map(
              ([date, timeSlots], index) => {
                const availableTimeSlots = timeSlots.filter(
                  (slot) => !slot.student
                );
                if (availableTimeSlots.length > 0) {
                  return (
                    <Grid
                      item
                      xs={12}
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <BookTime
                        date={date}
                        expanded={expanded === `panel${index}`}
                        onChange={() => handleAccordionChange(`panel${index}`)}
                        timeSlots={availableTimeSlots}
                      />
                    </Grid>
                  );
                }
                return null;
              }
            )}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {isLoading ? (
                <Typography variant="body1">Loading...</Typography>
              ) : error ? (
                <Typography variant="body1">Error: {error.message}</Typography>
              ) : (
                <Button
                  variant="contained"
                  sessionSlotId={sessionSlotId}
                  onEventAdded={setMessage}
                  redirectPath="/student"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  Confirm
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        ContentProps={{
          sx: {
            backgroundColor: "white",
          },
        }}
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            <CheckCircleOutlineOutlinedIcon
              fontSize="medium"
              style={{ marginRight: "8px", color: "#00897b" }}
            />
            <span style={{ color: "#00897b" }}>Time slot is booked...</span>
          </span>
        }
      />
    </>
  );
}
