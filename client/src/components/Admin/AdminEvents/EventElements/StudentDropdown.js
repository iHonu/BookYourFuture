import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import useFetch from "../../../../hooks/useFetch";

export default function StudentDropdown({
  value,
  onChange,
  disabled = false, // default value
  isGroup = false, // default value
  groupId,
}) {
  const [studentsList, setStudentsList] = useState([]);

  const { performFetch, error } = useFetch(
    `/group/${groupId}`,
    handleReceivedData
  );

  useEffect(() => {
    if (groupId) {
      performFetch();
    }
  }, [groupId]);

  function handleReceivedData(data) {
    if (data && data.groupData) {
      setStudentsList(data.groupData.students);
    }
  }

  if (isGroup) {
    return (
      <FormControl sx={{ minWidth: 220 }}>
        <InputLabel id="student-select-label">Student</InputLabel>
        <Select
          labelId="student-select-label"
          id="student-select"
          value="All"
          label="Student"
          onChange={onChange}
          disabled
        >
          <MenuItem value="All">All</MenuItem>
        </Select>
      </FormControl>
    );
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <FormControl sx={{ minWidth: 220 }} disabled={disabled}>
        <InputLabel id="student-select-label">Student</InputLabel>
        <Select
          labelId="student-select-label"
          id="student-select"
          value={value}
          label="Student"
          onChange={onChange}
        >
          {studentsList.map((student) => (
            <MenuItem key={student._id} value={student._id}>
              {student.firstName + " " + student.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

StudentDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isGroup: PropTypes.bool,
  groupId: PropTypes.string,
};
