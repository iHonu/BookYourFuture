import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

export default function GroupDropdown({ value, onChange, defaultValue }) {
  const [groupList, setGroupList] = useState([]);

  const { performFetch, error } = useFetch("/group/all", handleReceivedData);

  useEffect(() => {
    performFetch();
  }, []);

  function handleReceivedData(data) {
    setGroupList(data.groupsData);
  }

  if (error) return <div>Error: {error.message}</div>;

  const activeGroups = groupList.filter((group) => group.status === "active");

  return (
    <FormControl
      sx={{
        minWidth: {
          sm: 220,
        },
        maxWidth: {
          xs: 220,
          sm: "auto",
        },
      }}
      required
    >
      <InputLabel id="group-select-label">Group</InputLabel>
      <Select
        labelId="group-select-label"
        id="group-select"
        value={value || defaultValue || ""}
        onChange={onChange}
        label="Group *"
      >
        {activeGroups.map((group) => (
          <MenuItem key={group._id} value={group._id}>
            {group.numberOfGroupName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

GroupDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
