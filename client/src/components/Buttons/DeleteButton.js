import React from "react";
import useFetch from "../../hooks/useFetch";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

// Add prop validation
DeleteButton.propTypes = {
  id: PropTypes.string.isRequired, // id should be a string and is required
  reFetch: PropTypes.func.isRequired, // reFetch should be a function and is required
};

function DeleteButton({ id, reFetch }) {
  const { performFetch } = useFetch(`/group/${id}`, () => {
    toast.error("Deleted successfully");
    reFetch();
  });
  const handleDeleteClick = () => {
    // // Handle delete action here
    performFetch(null, "DELETE");
  };
  return (
    <IconButton onClick={() => handleDeleteClick()}>
      <DeleteIcon sx={{ color: "grey" }} />
    </IconButton>
  );
}

export default DeleteButton;