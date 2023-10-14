import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";

export function DurationDropdown({
  value,
  onChange,
  disabled,
  size = "medium",
}) {
  return (
    <FormControl sx={{ minWidth: 220 }} size={size}>
      <InputLabel id="duration-select-label">Duration</InputLabel>
      <Select
        labelId="duration-select-label"
        id="duration-select"
        label="Duration"
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <MenuItem value={900}>15 min</MenuItem>
        <MenuItem value={1800}>30 min</MenuItem>
        <MenuItem value={3600}>1 hour</MenuItem>
        <MenuItem value={10800}>3 hours</MenuItem>
      </Select>
    </FormControl>
  );
}

DurationDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

export function LocationToggle({ value, onChange }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Location *</FormLabel>
      <RadioGroup row name="location" value={value} onChange={onChange}>
        <FormControlLabel value="online" control={<Radio />} label="Online" />
        <FormControlLabel value="offline" control={<Radio />} label="Offline" />
      </RadioGroup>
    </FormControl>
  );
}

LocationToggle.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

// export function ReceiverToggle({ value, onChange }) {
//   return (
//     <FormControl component="fieldset">
//       <FormLabel component="legend">Receiver Type</FormLabel>
//       <RadioGroup row name="receiverType" value={value} onChange={onChange}>
//         <FormControlLabel value="group" control={<Radio />} label="Group" />
//         <FormControlLabel value="student" control={<Radio />} label="Student" />
//       </RadioGroup>
//     </FormControl>
//   );
// }

// ReceiverToggle.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func.isRequired,
// };
// export function StudentDropdown({ value, onChange, disabled, isGroup }) {
//   if (isGroup) {
//     return (
//       <FormControl sx={{ minWidth: 220 }}>
//         <InputLabel id="student-select-label">Student</InputLabel>
//         <Select
//           labelId="student-select-label"
//           id="student-select"
//           value="All"
//           label="Student"
//           onChange={onChange}
//           disabled
//         >
//           <MenuItem value="All">All</MenuItem>
//         </Select>
//       </FormControl>
//     );
//   } else {
//     return (
//       <FormControl sx={{ minWidth: 220 }} disabled={disabled}>
//         <InputLabel id="student-select-label">Student</InputLabel>
//         <Select
//           labelId="student-select-label"
//           id="student-select"
//           value={value}
//           label="Student"
//           onChange={onChange}
//         >
//           <MenuItem value={"Nurlan"}>Nurlan</MenuItem>
//           <MenuItem value={"Anastasia"}>Anastasia</MenuItem>
//           <MenuItem value={"Alevtina"}>Alevtina</MenuItem>
//           <MenuItem value={"Evghen"}>Evghen</MenuItem>
//         </Select>
//       </FormControl>
//     );
//   }
// }

// StudentDropdown.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func.isRequired,
//   disabled: PropTypes.bool,
//   isGroup: PropTypes.bool,
// };
