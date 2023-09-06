import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Container,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";

export default function EventTable(props) {
  const { events, selectedDate } = props;
  const filteredEvents = events.filter((event) => event.date === selectedDate);
  return (
    <Container>
      <Typography variant="h5" sx={{ mt: 2, mb: 4, textAlign: "left" }}>
        Events for {selectedDate}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEvents.map((event, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box
                  sx={{
                    width: 4,
                    height: 25,
                    bgcolor: event.colorCode,
                  }}
                />
              </TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

EventTable.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedDate: PropTypes.string.isRequired,
};
