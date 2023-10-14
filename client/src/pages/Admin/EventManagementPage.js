import React, { useEffect } from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Container, Stack, Hidden } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { selectorIsAuth } from "../../components/redux/authSlice";

import BasicTable from "../../components/Admin/AdminEvents/EventManagement/EventManagmentTable";

import FilterGroup from "../../components/Admin/AdminEvents/EventManagement/FilterGroup";

import SearchEvent from "../../components/Admin/AdminEvents/EventManagement/SearchEvent";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { fetchAllEvents } from "../../components/redux/eventsSlice";

export default function EventManagement() {
  // const isAuth = useSelector(selectorIsAuth);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const eventData = useSelector((state) => state.events.data);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, []);

  const handleAddEvent = () => {
    navigate("/events/add");
  };

  // if (!isAuth) {
  //   return navigate("/login");
  // }

  return (
    <Container>
      <Typography variant="h4" textAlign="center" sx={{ pt: 6, mb: 4 }}>
        Event Management
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={3}
        >
          <FilterGroup onFilterChange={(group) => setSelectedGroup(group)} />
          <SearchEvent onSearchChange={(term) => setSearch(term)} />
        </Stack>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          variant="contained"
          onClick={handleAddEvent}
          sx={{ mt: 2, mr: 3, mb: 1 }}
        >
          Add
          <Hidden mdDown> Event</Hidden>
        </Button>
      </Stack>
      <BasicTable filterGroup={selectedGroup} search={search} />
    </Container>
  );
}
