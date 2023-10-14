import React from "react";
import { TableHead, TableRow, TableCell, Hidden } from "@mui/material";

export default function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold" }}>Event</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
        <Hidden mdDown>
          <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
        </Hidden>

        <TableCell sx={{ fontWeight: "bold" }}>Group</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}></TableCell>
      </TableRow>
    </TableHead>
  );
}
