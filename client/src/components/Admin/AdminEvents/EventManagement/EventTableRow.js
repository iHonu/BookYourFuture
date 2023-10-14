// EventTableRow.js

import React from "react";
import { TableRow, TableCell, Hidden } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function EventTableRow({ rows }) {
  const navigate = useNavigate();

  const handleEditClick = (_id) => {
    navigate(`/events/edit/${_id}`);
  };

  return rows.map((event) => (
    <TableRow
      key={event._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{event.title}</TableCell>
      <TableCell>
        {event.sessionSlot.length > 0
          ? dayjs(event.sessionSlot[0].startTime).format("MMM D, YYYY")
          : "N/A"}
      </TableCell>
      <Hidden mdDown>
        <TableCell>{event.location}</TableCell>
      </Hidden>
      <TableCell>{event.group[0]?.numberOfGroupName || "All"}</TableCell>

      <TableCell>
        <EditIcon
          onClick={() => handleEditClick(event._id)}
          color="action"
          sx={{ "&:hover": { color: "secondary.main" } }}
          cursor="pointer"
        />
      </TableCell>
    </TableRow>
  ));
}
