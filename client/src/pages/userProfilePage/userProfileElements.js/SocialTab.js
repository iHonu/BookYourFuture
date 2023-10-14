import React, { useCallback, useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";

export default function SocialTab({ setCurrentData }) {
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
        <Grid item xs={12} sm={6}>
          <Stack gap={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                name="gitHub"
                value={debouncedValues?.gitHub || ""}
                label="GitHub"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GitHubIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="linkedIn"
                value={debouncedValues?.linkedIn || ""}
                label="LinkedIn"
                variant="outlined"
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                name="facebook"
                value={debouncedValues?.facebook || ""}
                label="Facebook"
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="telegram"
                value={debouncedValues?.telegram || ""}
                label="Telegram"
                variant="outlined"
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TelegramIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={1}></Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Start Building Your Network
          </Typography>
          <Typography variant="body1">
            Add your social links and start connecting with people. Social
            connections are very important bla bla bla
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

SocialTab.propTypes = {
  currentData: PropTypes.shape({
    gitHub: PropTypes.string,
    linkedIn: PropTypes.string,
    facebook: PropTypes.string,
    telegram: PropTypes.string,
  }),
  setCurrentData: PropTypes.func.isRequired,
};
