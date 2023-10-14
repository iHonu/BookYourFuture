import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function DeleteTSButton({ sessionSlotId, onTimeslotDelete }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const { error, performFetch } = useFetch(
    `/event/bookTime/DeleteStudent/${sessionSlotId}`,
    () => {
      setOpenDialog(false);

      setTimeout(() => {
        if (onTimeslotDelete) {
          onTimeslotDelete();
        }
      }, 1000);
    }
  );

  const userData = useSelector((state) => state.auth.data);
  const userId = userData ? userData._id : null;

  useEffect(() => {
    if (error) {
      setErrorMessage("There was an error confirming. Please try again.");
    }
  }, [error]);

  const handleOnSubmit = () => {
    const requestBody = {
      studentId: userId,
    };

    performFetch(requestBody, "Delete", requestBody);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setErrorMessage("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="white"
        onClick={handleClose}
      ></IconButton>
    </React.Fragment>
  );

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton variant="contained" onClick={handleOpenDialog}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>
            {errorMessage
              ? errorMessage
              : "Are you sure you want to delete this Time slot?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          {errorMessage ? null : (
            <Button
              onClick={() => {
                handleOnSubmit();
                handleClick();
              }}
              onClickcolor="primary"
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        ContentProps={{
          sx: {
            backgroundColor: "white",
          },
        }}
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            <CheckCircleOutlineOutlinedIcon
              fontSize="medium"
              style={{ marginRight: "8px", color: "#00897b" }}
            />
            <span style={{ color: "#00897b" }}>Deleted Successfully...</span>
          </span>
        }
        action={action}
      />
    </>
  );
}

DeleteTSButton.propTypes = {
  sessionSlotId: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func,
  onTimeslotDelete: PropTypes.func,
};
