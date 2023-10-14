import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BasicPie from "./PieChart";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";
import { fetchAllStudents } from "../../../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../../../redux/eventsSlice";

export default function PieChartCard() {
  const data = useSelector((state) => state.students.data);
  const events = useSelector((state) => state.events.data);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  const studentLength = data?.usersData.length;
  const eventsData = events?.eventsData.length;
  React.useEffect(() => {
    // Fetch groups when the component mounts
    dispatch(fetchAllStudents());
    dispatch(fetchAllEvents());
  }, []);

  return (
    <>
      <Card
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          margin: "16px",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            flex: "2",
            backgroundColor: "white",
            padding: "16px",
            color: "#00695c",
          }}
        >
          <Typography variant="h6">Active Students</Typography>
          <Typography variant="h4">{studentLength}</Typography>
        </CardContent>
        <div
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <AccountCircleTwoToneIcon
            style={{ fontSize: 50, color: "#00695c" }}
          />
        </div>
      </Card>

      <Card
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          margin: "16px",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            flex: "2",
            backgroundColor: "white",
            padding: "16px",
            color: "#1976d2",
          }}
        >
          <Typography variant="h6">Upcoming Events</Typography>
          <Typography variant="h4">{eventsData}</Typography>
        </CardContent>
        <div
          style={{
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <EventTwoToneIcon
            style={{ fontSize: 50, color: "#1976d2" }} // Matching color with the text
          />
        </div>
      </Card>
      <Card sx={{ my: 3, mx: 2 }}>
        <BasicPie />
      </Card>
    </>
  );
}
