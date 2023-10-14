import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import MainEventInfo from "../../components/Admin/AdminEvents/AddEvent/AddEventInfo";
import EditEventDatePicker from "../../components/Admin/AdminEvents/EditEvent/EditEventDatePicker";
import EventContext from "../../components/Admin/AdminEvents/AddEvent/EventContext";
import SaveButton from "../../components/Admin/AdminEvents/EventElements/SaveButton";
import DeleteButton from "../../components/Admin/AdminEvents/EventElements/DeleteButton";
import CancelButton from "../../components/Admin/AdminEvents/EventElements/CancelButton";
import {
  Container,
  Typography,
  Grid,
  Box,
  Snackbar,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { DurationDropdown } from "../../components/Admin/AdminEvents/AddEvent/AddEventElements";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectorIsAuth } from "../../components/redux/authSlice";

export default function EditEventPage() {
  // const isAuth = useSelector(selectorIsAuth);
  const { id } = useParams();
  // const navigate = useNavigate();

  const [message, setMessage] = useState("");

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

  const { performFetch, cancelFetch, isLoading, error } = useFetch(
    `/event/${id}`,
    handleReceivedData
  );

  useEffect(() => {
    performFetch();

    return () => {
      cancelFetch();
    };
  }, []);

  useEffect(() => {
    if (error) {
      handleMessage("There was an error fetching the event data.");
    }
  }, [error]);

  function handleReceivedData(data) {
    const processedSessionSlots = data?.eventData?.sessionSlot?.map((slot) => ({
      durationInSeconds: slot.durationInSeconds,
      startTime: dayjs(slot.startTime),
      _id: slot._id,
      student: slot.student,
    }));

    const firstSessionDuration =
      processedSessionSlots && processedSessionSlots.length > 0
        ? processedSessionSlots[0].durationInSeconds
        : "";

    setEventData({
      ...data.eventData,
      group: data.eventData.group[0]._id,
      sessionSlot: processedSessionSlots,
      duration: firstSessionDuration,
    });
  }

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  // if (!isAuth) {
  //   return navigate("/login");
  // }
  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      <Container>
        {isLoading ? (
          <Typography variant="h5" sx={{ pt: 4, mb: 5, mt: 2 }}>
            Loading...
          </Typography>
        ) : (
          <>
            <Typography variant="h3" sx={{ pt: 4, mb: 5, mt: 2 }}>
              Edit Event
            </Typography>
            <Grid container>
              <Grid item xs={12} md={5}>
                <MainEventInfo />
              </Grid>
              <Grid item xs={false} md={2}></Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    minHeight: { xs: "30px", md: "500px" },
                    mt: { xs: 4, md: 0 },
                  }}
                >
                  <DurationDropdown
                    disabled={true}
                    size="small"
                    value={eventData.duration}
                  />
                  <EditEventDatePicker sessionSlot={eventData.sessionSlot} />
                </Box>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
                <SaveButton
                  eventData={eventData}
                  onSaved={handleMessage}
                  onError={handleMessage}
                  endpoint={`/event/edit/${id}`}
                  redirectPath="/events"
                />
                <DeleteButton
                  endpoint={`/event/${id}`}
                  onDeleted={handleMessage}
                  redirectPath="/events"
                />
                <CancelButton endpoint="/events" />
              </Stack>
            </Grid>
          </>
        )}
      </Container>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        message={message}
      />
    </EventContext.Provider>
  );
}
