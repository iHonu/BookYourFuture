import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

export default function CancelButton({ endpoint }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(endpoint);
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleCancel}>
      Cancel
    </Button>
  );
}

CancelButton.propTypes = {
  endpoint: PropTypes.string.isRequired,
};
