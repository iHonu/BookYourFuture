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

export default function EventTable(props) {
  const { events, selectedDate } = props;

  const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");

  const filteredEvents = events.filter((event) =>
    event.sessionSlot.some(
      (slot) => dayjs(slot.startTime).format("YYYY-MM-DD") === formattedDate
    )
  );

  const flattenedEvents = filteredEvents.flatMap((event) =>
    event.sessionSlot
      .filter(
        (slot) => dayjs(slot.startTime).format("YYYY-MM-DD") === formattedDate
      )
      .map((slot) => ({
        ...event,
        slot,
      }))
  );

  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(flattenedEvents.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const eventsForCurrentPage = flattenedEvents.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      {flattenedEvents.length > 0 && (
        <>
          {/* <Typography variant="h5" sx={{ mt: 2, mb: 4, textAlign: "left" }}>
            Events for {dayjs(selectedDate).format("MMMM D")}
          </Typography> */}
          <Table size="inherit">
            <TableHead>
              <TableRow>
                <TableCell align="left">Time</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Student</TableCell>
                <Hidden mdDown>
                  <TableCell align="right">Group</TableCell>
                </Hidden>
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
                  <Hidden smDown></Hidden>
                  <TableCell align="left">
                    {dayjs(event.slot.startTime).format("HH:mm")}
                  </TableCell>
                  <TableCell>
                    {event.title.length > 120
                      ? `${event.title.slice(0, 118)}...`
                      : event.title}
                  </TableCell>
                  <TableCell>
                    {`${event.slot.student?.firstName || "N/A"} ${
                      event.slot.student?.lastName || ""
                    }`}
                  </TableCell>
                  <Hidden mdDown>
                    <TableCell align="right">
                      {event.group[0]?.numberOfGroupName}
                    </TableCell>
                  </Hidden>
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
      )}

      {filteredEvents.length === 0 && (
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
      name: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      time: PropTypes.string,
      group: PropTypes.arrayOf(
        PropTypes.shape({
          numberOfGroupName: PropTypes.number,
        })
      ),
    })
  ),
  selectedDate: PropTypes.object,
};
