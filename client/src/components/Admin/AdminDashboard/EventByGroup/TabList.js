import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabList({ value, onChange, groupLabels }) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
      sx={{ my: 2 }}
    >
      {groupLabels.map((group) => (
        <Tab
          key={group._id}
          label={`Group ${group.numberOfGroupName}`}
          {...a11yProps(group.numberOfGroupName)}
        />
      ))}
    </Tabs>
  );
}

TabList.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  groupLabels: PropTypes.array.isRequired,
};
