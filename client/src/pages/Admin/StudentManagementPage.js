import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Box,
  Button,
  Hidden,
  Typography,
  TextField,
  Stack,
  CircularProgress,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteButton from "../../components/Buttons/DeleteButton";
import FilterByGroup from "../../components/Filters/FilterByGroup";
import { useDispatch } from "react-redux";
import { fetchAllStudents } from "../../components/redux/studentsSlice";

function StudentManagementPage() {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedGroup, setSelectedGroup] = useState("All"); // State for selected group filter
  // const isAuth = useSelector(selectorIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllStudents());
    performFetch();
  }, []);

  const { performFetch, error, isLoading } = useFetch("/user/all", (result) => {
    setData(result.usersData);
    // eslint-disable-next-line no-console
    console.error(error);
  });

  const handleEditClick = (id) => {
    // eslint-disable-next-line no-console
    console.log(`Edit clicked for ID ${id}`);
    navigate(`editStudent/${id}`);
  };

  const filteredData = data
    ? data.filter((student) => {
        // Check if the student matches the search query
        const fullName =
          `${student.firstName} ${student.lastName}`.toLowerCase();
        const email = student.email.toLowerCase();
        const query = searchQuery.toLowerCase();
        const isGroupMatch =
          selectedGroup === "All" ||
          student.group[0]?.numberOfGroupName.toString() === selectedGroup;
        const isAdmin = student.admin;

        return (
          (fullName.includes(query) || email.includes(query)) &&
          isGroupMatch &&
          !isAdmin
        );
      })
    : [];

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 16,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {data && (
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 4, mt: 6, textAlign: "center" }}
            >
              Students Management
            </Typography>
          </Box>
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
              <FilterByGroup
                onFilterChange={(group) => setSelectedGroup(group)}
              />
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Stack>
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="contained"
              onClick={() => {
                navigate("/addStudent");
              }}
              sx={{ mt: 1, mb: 1 }}
            >
              Add
              <Hidden mdDown> Student</Hidden>
            </Button>
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Group</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <Hidden mdDown>
                    <TableCell sx={{ fontWeight: "bold" }}>Github</TableCell>
                  </Hidden>
                  <Hidden mdDown>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Linkedin
                    </TableCell>
                  </Hidden>
                  <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>
                      <Avatar
                        alt="Remy Sharp"
                        src={student.avatarUrl}
                        sx={{ ml: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell
                      key={student.group[0]?._id}
                      value={student.group[0]?.numberOfGroupName}
                    >
                      {student.group[0]?.numberOfGroupName}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <Hidden mdDown>
                      <TableCell>{student.gitHub}</TableCell>
                    </Hidden>
                    <Hidden mdDown>
                      <TableCell align="right">{student.linkedIn}</TableCell>
                    </Hidden>
                    <TableCell align="right">
                      <Box display="flex" justifyContent="flex-end">
                        <IconButton
                          onClick={() => handleEditClick(student._id)}
                          sx={{ mr: { xs: 1, sm: 3 } }}
                        >
                          <EditIcon sx={{ color: "grey" }} />
                        </IconButton>

                        <DeleteButton
                          id={student._id}
                          page="user"
                          reFetch={performFetch}
                          titleConfirm={"Delete student"}
                          contentConfirm={`Are you sure you want to delete a student ${student.firstName} ${student.lastName}?`}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
}

export default StudentManagementPage;
