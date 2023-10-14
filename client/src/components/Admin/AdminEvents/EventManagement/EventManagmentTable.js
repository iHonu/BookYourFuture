import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Pagination,
} from "@mui/material";
import PropTypes from "prop-types";
import TableHeader from "./EventTableHeader";
import EventTableRow from "./EventTableRow";
import useFetch from "../../../../hooks/useFetch";

const rowsPerPage = 10;

export default function BasicTable({ filterGroup, search }) {
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);
  const { performFetch } = useFetch(
    `/event/all?groupId=${filterGroup}&title=${search}`,
    handleReceivedData
  );

  useEffect(() => {
    performFetch();
  }, [filterGroup, search]);

  function handleReceivedData(data) {
    setEvents(data.eventsData);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const pageCount = Math.ceil(events.length / rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHeader />
          <TableBody>
            <EventTableRow
              rows={events.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChangePage}
        size="small"
        sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}
      />
    </>
  );
}

BasicTable.propTypes = {
  filterGroup: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
