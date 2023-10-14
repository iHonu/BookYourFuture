import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import ModalConfirm from "../Modal/ModalConfirm";

// Add prop validation
DeleteButton.propTypes = {
  id: PropTypes.string.isRequired, // id should be a string and is required
  reFetch: PropTypes.func.isRequired, // reFetch should be a function and is required
  page: PropTypes.string.isRequired,
  contentConfirm: PropTypes.string,
  titleConfirm: PropTypes.string,
};

function DeleteButton({ id, page, reFetch, contentConfirm, titleConfirm }) {
  const [openConfirmDialogue, setOpenConfirmDialogue] = useState(false);
  const { performFetch } = useFetch(`/${page}/${id}`, () => {
    toast.error("Deleted successfully");
    reFetch();
  });
  const handleDeleteClick = () => {
    performFetch(null, "DELETE");
  };
  return (
    <>
      <IconButton onClick={() => setOpenConfirmDialogue(true)}>
        <DeleteIcon sx={{ color: "grey" }} />
      </IconButton>
      <ModalConfirm
        open={openConfirmDialogue}
        setOpen={setOpenConfirmDialogue}
        handleConfirm={handleDeleteClick}
        content={contentConfirm}
        title={titleConfirm}
      />
    </>
  );
}

export default DeleteButton;
