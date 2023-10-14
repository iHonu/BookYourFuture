import React, { useState, useEffect } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function DeleteButton({ endpoint, onDeleted, redirectPath }) {
  const navigate = useNavigate();
  const { isLoading, performFetch } = useFetch(endpoint, () => {
    onDeleted("Deleted successfully! Redirecting...");
    setTimeout(() => {
      navigate(redirectPath);
    }, 500);
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState(null);

  const handleDelete = () => {
    const timer = setTimeout(() => {
      performFetch(null, "DELETE");
      setSnackbarOpen(false);
    }, 3000);

    setDeleteTimer(timer);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    clearTimeout(deleteTimer);
    setSnackbarOpen(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(deleteTimer);
    };
  }, [deleteTimer]);

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleDelete}
        disabled={isLoading}
        color="error"
      >
        Delete Event
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
              UNDO
            </Button>
          }
        >
          Deleting event...
        </Alert>
      </Snackbar>
    </>
  );
}

DeleteButton.propTypes = {
  endpoint: PropTypes.string.isRequired,
  redirectPath: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
};
