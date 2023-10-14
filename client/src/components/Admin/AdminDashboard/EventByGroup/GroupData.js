import React from "react";
import PropTypes from "prop-types";
import { Hidden, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";

export default function GroupData({ data }) {
  const sessionDate =
    data.sessionSlot &&
    data.sessionSlot.length > 0 &&
    data.sessionSlot[0].startTime
      ? dayjs(data.sessionSlot[0].startTime).format("MMM D, YYYY")
      : "N/A";

  const sessionTime =
    data.sessionSlot &&
    data.sessionSlot.length > 0 &&
    data.sessionSlot[0].startTime
      ? dayjs(data.sessionSlot[0].startTime).format("HH:mm")
      : "N/A";

  return (
    <Box
      elevation={1}
      key={data._id}
      sx={{
        paddingY: "1.25rem",
        paddingX: ".75rem",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "left",
        ":hover": { backgroundColor: "#fafafa" },
      }}
    >
      <Box sx={{ flex: 1 }} align="left">
        <Typography variant="subtitle2">{sessionDate}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2">{sessionTime}</Typography>
      </Box>
      <Box sx={{ flex: 2 }}>
        <Typography variant="subtitle2">{data.title}</Typography>
      </Box>
      <Hidden smDown>
        <Box sx={{ flex: 1 }} align="right">
          {data.location === "online" ? (
            <Chip variant="outlined" label="Online" color="info" size="small" />
          ) : data.location === "offline" ? (
            <Chip
              variant="outlined"
              label="Offline"
              color="warning"
              size="small"
            />
          ) : (
            <Typography variant="subtitle2" align="right">
              {data.location}
            </Typography>
          )}
        </Box>
      </Hidden>
    </Box>
  );
}

GroupData.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    group: PropTypes.array.isRequired,
    sessionSlot: PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.string,
      })
    ),
  }).isRequired,
};
