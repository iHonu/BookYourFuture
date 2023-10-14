import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Stack,
  Typography,
  Box,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from "@mui/material";

import PropTypes from "prop-types";
import ProfileTab from "./userProfileElements.js/ProfileTab";
import SocialTab from "./userProfileElements.js/SocialTab";
import SecurityTab from "./userProfileElements.js/SecurityTab";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfo, getOneUser } from "../../components/redux/userSlice";
import { useParams } from "react-router-dom";
import CancelButton from "../../components/Admin/AdminEvents/EventElements/CancelButton";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function UserProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const reduxPayload = useSelector((state) => state.user.data);
  const { success, userData } = reduxPayload || {};

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const [currentData, setCurrentData] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeInfo = () => {
    // Dispatch the action with the updated currentData
    dispatch(editUserInfo({ id, params: currentData }))
      .then(() => {
        setSnackbar({
          open: true,
          message: "Successfully updated user info!",
          severity: "success",
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Failed to update user info.",
          severity: "error",
        });
      });
  };

  useEffect(() => {
    dispatch(getOneUser(id)).catch((err) => {
      //eslint-disable-next-line no-console
      console.error(err);
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (success && userData) {
      setCurrentData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        city: userData.city || "",
        street: userData.street || "",
        houseNumber: userData.houseNumber || "",
        zipCode: userData.zipCode || "",
        gitHub: userData.gitHub || "",
        linkedIn: userData.linkedIn || "",
        facebook: userData.facebook || "",
        telegram: userData.telegram || "",
        avatarUrl: userData.avatarUrl || "",
      });
    }
  }, [success, userData]);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: "20px" }}>
        User Profile
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Social" {...a11yProps(1)} />
            <Tab label="Security" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProfileTab
            currentData={currentData}
            setCurrentData={setCurrentData}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SocialTab
            currentData={currentData}
            setCurrentData={setCurrentData}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SecurityTab />
        </CustomTabPanel>
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        mt={3}
        sx={{ display: "flex", justifyContent: "center", mt: 8 }}
      >
        <Button
          variant="contained"
          onClick={handleChangeInfo}
          color="primary"
          sx={{ minWidth: "100px" }}
        >
          Save
        </Button>
        <CancelButton endpoint="/" sx={{ minWidth: "100px" }} />
      </Stack>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
