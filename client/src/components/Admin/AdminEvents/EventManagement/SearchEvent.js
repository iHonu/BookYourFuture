import React, { useState } from "react";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function SearchEvent({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <TextField
      size="small"
      label="Event"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      sx={{ m: 1, minWidth: 120 }}
    />
  );
}

SearchEvent.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};
