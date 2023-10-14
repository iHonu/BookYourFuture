import React, { useEffect } from "react";
import { Button } from "@mui/material";
import useFetch from "../../../../hooks/useFetch";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function SaveButton({
  eventData,
  onSaved,
  onError,
  endpoint,
  redirectPath,
}) {
  const navigate = useNavigate();
  const { isLoading, error, performFetch } = useFetch(endpoint, () => {
    onSaved("Saved successfully!");
    setTimeout(() => {
      navigate(redirectPath);
    }, 1000);
  });

  useEffect(() => {
    if (error) {
      onError("An error occurred while saving.");
    }
  }, [error, onError]);

  const handleSave = () => {
    performFetch(eventData, "PATCH");
  };

  return (
    <Button variant="contained" onClick={handleSave} disabled={isLoading}>
      Save Changes
    </Button>
  );
}

SaveButton.propTypes = {
  eventData: PropTypes.object.isRequired,
  onSaved: PropTypes.func.isRequired,
  onError: PropTypes.func,
  endpoint: PropTypes.string.isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  redirectPath: PropTypes.string,
};
