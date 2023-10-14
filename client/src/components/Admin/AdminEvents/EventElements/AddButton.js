import React, { useEffect } from "react";
import { Button } from "@mui/material";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function AddEventButton({
  eventData,
  onEventAdded,
  endpoint = "/event/add",
  redirectPath = "/events",
  buttonLabel = "Add Event",
}) {
  const navigate = useNavigate();

  const { isLoading, error, performFetch } = useFetch(endpoint, () => {
    onEventAdded("Added successfully! Redirecting...");
    setTimeout(() => {
      navigate(redirectPath);
    }, 1000);
  });

  useEffect(() => {
    if (error) {
      onEventAdded("There was an error adding. Please try again.");
    }
  }, [error, onEventAdded]);

  const handleOnSubmit = () => {
    performFetch(eventData, "POST");
  };

  return (
    <Button variant="contained" onClick={handleOnSubmit} disabled={isLoading}>
      {buttonLabel}
    </Button>
  );
}

AddEventButton.propTypes = {
  eventData: PropTypes.object.isRequired,
  onEventAdded: PropTypes.func.isRequired,
  endpoint: PropTypes.string,
  redirectPath: PropTypes.string,
  buttonLabel: PropTypes.string,
};
