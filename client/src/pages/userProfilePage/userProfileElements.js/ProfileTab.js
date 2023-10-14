import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Stack, TextField } from "@mui/material";
import PropTypes from "prop-types";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";
import debounce from "lodash.debounce";

export default function ProfileTab({ currentData, setCurrentData }) {
  const userData = useSelector((state) => state.auth.data);

  const [debouncedValues, setDebouncedValues] = useState(userData);

  // Create a debounced version of setCurrentData
  const debouncedSetCurrentData = useCallback(
    debounce((name, value) => {
      setCurrentData(name, value);
    }, 1000),
    []
  );

  // Handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the debouncedValues state with the new value
    setDebouncedValues((prevData) => ({ ...prevData, [name]: value }));

    // Trigger the debounced setCurrentData after 1000ms
    debouncedSetCurrentData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Stack spacing={3} alignItems="center" justifyContent="center">
            <UploadWidget
              currentData={currentData}
              setCurrentData={setCurrentData}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack gap={2}>
            <TextField
              name="firstName"
              label="First Name"
              value={debouncedValues?.firstName || ""}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={debouncedValues?.lastName || ""}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                name="city"
                label="City"
                value={debouncedValues?.city || ""}
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
              />
              <TextField
                name="zipCode"
                label="Zip Code"
                value={debouncedValues?.zipCode || ""}
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                name="phone"
                label="Phone number"
                value={debouncedValues?.phone || ""}
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
              />
              <TextField
                value={userData?.email}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

ProfileTab.propTypes = {
  currentData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    city: PropTypes.string,
    zipCode: PropTypes.string,
    phone: PropTypes.string,
  }),
  setCurrentData: PropTypes.func,
};
