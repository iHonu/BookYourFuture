import * as React from "react";
import Box from "@mui/material/Box";
import TabList from "./TabList";
import TabPanels from "./TabPanels";
import { useState, useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";

export default function EventByGroup() {
  const [value, setValue] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const { performFetch: fetchGroups, error: groupError } = useFetch(
    "/group/all",
    handleGroupsReceived
  );

  useEffect(() => {
    fetchGroups();
  }, []);

  function handleGroupsReceived(data) {
    setGroupList(data.groupsData);
  }

  const [demoData, setDemoData] = useState([]);
  const { performFetch: fetchEvents, error: eventError } = useFetch(
    "/event/all",
    handleEventsReceived
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleEventsReceived(data) {
    setDemoData(data.eventsData);
  }

  if (groupError) return <div>Error fetching groups: {groupError.message}</div>;
  if (eventError) return <div>Error fetching events: {eventError.message}</div>;

  const activeGroups = groupList.filter((group) => group.status === "active");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          value={value}
          onChange={handleChange}
          groupLabels={activeGroups}
        />
      </Box>
      <TabPanels value={value} groupLabels={activeGroups} demoData={demoData} />
    </Box>
  );
}
