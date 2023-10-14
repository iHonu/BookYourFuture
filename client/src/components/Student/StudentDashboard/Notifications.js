import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Notifications.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useRadioContext } from "../StudentEventManagement/TimeSlotContext";

export default function Notifications(props) {
  const { notifications } = props;
  const { setEventName } = useRadioContext();
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, 2));
  }, [notifications]);

  const handleDismiss = (notificationId) => {
    setVisibleNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {visibleNotifications.map((notification, index) => (
        <Link
          key={index}
          to={notification.action.link}
          onClick={() => {
            setEventName(notification.id);
            handleDismiss(notification.id);
          }}
          style={{ textDecoration: "none" }}
        >
          <Alert
            icon={<InfoOutlinedIcon />}
            className="animated-alert"
            action={
              notification.action ? (
                <Button
                  style={{ color: "black" }}
                  size="small"
                  className="book-a-slot-button"
                >
                  {notification.action.label}
                  <ChevronRightIcon />
                </Button>
              ) : null
            }
            severity={notification.type || "info"}
          >
            {notification.message}
          </Alert>
        </Link>
      ))}
    </Stack>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
      type: PropTypes.string,
      action: PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string,
      }),
    })
  ),
};
