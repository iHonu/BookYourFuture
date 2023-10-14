import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Container,
  Box,
  Hidden,
} from "@mui/material";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import formatDuration from "./FormatDuration";
import DeleteTSButton from "./DeleteTSButton";

export default function EventTable(props) {
  const { events, selectedDate, onTimeslotDelete } = props;
  const userData = useSelector((state) => state.auth.data);
  const userId = userData ? userData._id : null;

  const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");

  const filteredEvents = events.filter((event) =>
    event.sessionSlot.some(
      (slot) =>
        dayjs(slot.startTime).format("YYYY-MM-DD") === formattedDate &&
        slot.student &&
        slot.student._id === userId
    )
  );

  const itemsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const eventsForCurrentPage = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      {filteredEvents.length > 0 ? (
        <>
          <Typography variant="h5" sx={{ mt: 2, mb: 4, textAlign: "left" }}>
            Events for {dayjs(selectedDate).format("MMMM D")}
          </Typography>
          <Table size="inherit">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <Hidden smDown>
                  <TableCell>Location</TableCell>
                </Hidden>
                <TableCell>Time</TableCell>
                <Hidden smDown>
                  <TableCell>Duration</TableCell>
                </Hidden>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {eventsForCurrentPage.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>
                    {dayjs(selectedDate).format("DD-MM-YYYY")}
                  </TableCell>
                  <Hidden smDown>
                    <TableCell>{event.location}</TableCell>
                  </Hidden>
                  <TableCell>
                    {dayjs(event.sessionSlot[0].startTime).format("HH:mm")}
                  </TableCell>
                  <Hidden smDown>
                    <TableCell>
                      {formatDuration(event.sessionSlot[0].durationInSeconds)}
                    </TableCell>
                  </Hidden>
                  <TableCell>
                    <DeleteTSButton
                      sessionSlotId={
                        event.sessionSlot.find(
                          (slot) => slot.student && slot.student._id === userId
                        )?._id
                      }
                      events={events}
                      onTimeslotDelete={onTimeslotDelete}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mt: "5em" }}>
            No events for {dayjs(selectedDate).format("MMMM D")}
          </Typography>
          <EventBusyIcon fontSize="large" sx={{ mt: "0.5em" }} />
        </div>
      )}
    </Container>
  );
}

EventTable.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ).isRequired,
  selectedDate: PropTypes.object,
  onTimeslotDelete: PropTypes.func,
};
