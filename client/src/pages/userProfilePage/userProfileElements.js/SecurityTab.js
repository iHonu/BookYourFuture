import React, { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteUser } from "../../../components/redux/userSlice";
import ModalConfirm from "../../../components/Modal/ModalConfirm";
import { logout } from "../../../components/redux/authSlice";

export default function SecurityTab() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);

  const [openConfirmDialogue, setOpenConfirmDialogue] = useState(false);
  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleDeleteAccount = () => {
    // User confirmed, so proceed with deletion
    dispatch(getDeleteUser(id));
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8}>
          <Button variant="outlined" onClick={handleChangePassword}>
            Change Password
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenConfirmDialogue(true);
            }}
            color="error"
            sx={{ mb: 3 }}
            disabled={userData.admin}
          >
            Delete Account
          </Button>
          <Typography variant="body1">
            WARNING! This action is irreversible. Once you delete your account,
            you will not be able to recover it.
          </Typography>
          <ModalConfirm
            open={openConfirmDialogue}
            setOpen={setOpenConfirmDialogue}
            handleConfirm={handleDeleteAccount}
            content={`Are you sure you want to delete a student ${userData?.firstName} ${userData?.lastName}?`}
            title={"Delete account"}
          />
        </Grid>
      </Grid>
    </>
  );
}
