import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { todayDate } from "../Student/StudentEventManagement/FormatDate";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const initialValue = dayjs(todayDate);

function ServerDay(props) {
  const { isSelected, ...other } = props;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "😸" : undefined}
    >
      <PickersDay {...other} />
    </Badge>
  );
}

export default function Calendar(props) {
  const userData = useSelector((state) => state.auth.data);
  const userId = userData ? userData._id : null;
  const { eventsData, onDateSelected } = props;
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(initialValue.month());
  const [selectedYear, setSelectedYear] = useState(initialValue.year());

  useEffect(() => {
    const allHighlightedDays = [];

    eventsData.forEach((event) => {
      event.sessionSlot.forEach((slot) => {
        if (slot.student && slot.student._id === userId) {
          const startTime = dayjs(slot.startTime);
          allHighlightedDays.push({
            date: startTime.date(),
            month: startTime.month(),
          });
        }
      });
    });

    setHighlightedDays(allHighlightedDays);
  }, [eventsData, userId]);

  const handleMonthChange = (newDate) => {
    setSelectedMonth(newDate.month());
    setSelectedYear(newDate.year());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        onChange={onDateSelected}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (dayProps) => {
            const isCurrentMonth =
              dayProps.day.month() === selectedMonth &&
              dayProps.day.year() === selectedYear;

            const isSelectedDay = highlightedDays.some(
              (highlightedDay) =>
                dayProps.day.date() === highlightedDay.date &&
                dayProps.day.month() === highlightedDay.month
            );

            return (
              <ServerDay
                {...dayProps}
                isSelected={isCurrentMonth && isSelectedDay}
              />
            );
          },
        }}
      />
    </LocalizationProvider>
  );
}

ServerDay.propTypes = {
  day: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

Calendar.propTypes = {
  eventsData: PropTypes.arrayOf(
    PropTypes.shape({
      sessionSlot: PropTypes.arrayOf(
        PropTypes.shape({
          startTime: PropTypes.string.isRequired,
          student: PropTypes.shape({
            _id: PropTypes.string.isRequired,
          }),
        })
      ).isRequired,
    })
  ).isRequired,
  onDateSelected: PropTypes.func.isRequired,
};
