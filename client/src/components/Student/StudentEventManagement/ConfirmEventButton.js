import React, { useEffect } from "react";
import { Button } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useRadioContext } from "./TimeSlotContext";

export default function ConfirmEventButton({
  onEventAdded,
  buttonLabel = "Confirm",
}) {
  const navigate = useNavigate();
  const { selectedValue } = useRadioContext();

  const { error, performFetch } = useFetch(
    `/event/bookTime/addStudent/${selectedValue}`,
    () => {
      onEventAdded("Time slot is confirmed...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  );

  const userData = useSelector((state) => state.auth.data);
  const userId = userData ? userData._id : null;

  useEffect(() => {
    if (error) {
      onEventAdded("There was an error confirming. Please try again.");
    }
  }, [error, onEventAdded]);

  const handleOnSubmit = () => {
    const requestBody = {
      studentId: userId,
    };

    performFetch(requestBody, "POST", requestBody);
  };

  return (
    <Button
      variant="contained"
      onClick={handleOnSubmit}
      disabled={selectedValue ? false : true}
    >
      {buttonLabel}
    </Button>
  );
}

ConfirmEventButton.propTypes = {
  sessionSlotId: PropTypes.string,
  onEventAdded: PropTypes.func.isRequired,
  endpoint: PropTypes.string,
  redirectPath: PropTypes.string,
  buttonLabel: PropTypes.string,
};
