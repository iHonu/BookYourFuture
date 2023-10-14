import React, { useEffect, useMemo, useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Container,
  Stack,
  Box,
} from "@mui/material";
import { Button } from "../../components/Buttons/Button";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GroupDropdown from "../../components/Admin/AdminEvents/EventElements/GroupDropdown";
import CancelButton from "../../components/Admin/AdminEvents/EventElements/CancelButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  fetchStudentDetails,
  studentSelector,
  updateStudent,
} from "../../components/redux/studentsSlice";

export default function AddEditStudentPage() {
  const { status, error, userDetails } = useSelector(studentSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEdit = useMemo(() => pathname.includes("editStudent"), [pathname]);
  const [groupNumber, setGroupNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName);
      setLastName(userDetails.lastName);
      setEmail(userDetails.email);
      setGroupNumber(userDetails.group[0]?._id);
    }
  }, [userDetails]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    isEdit && id && dispatch(fetchStudentDetails(id));
  }, [isEdit]);

  const handleSave = (event) => {
    event.preventDefault();
    const usersData = {
      firstName: firstName,
      lastName: lastName,
      group: [groupNumber],
      email: email,
    };

    isEdit
      ? dispatch(updateStudent({ body: usersData, id }))
          .unwrap()
          .then(() => {
            toast.success("Updated successfully");
            navigate("/students");
          })
      : dispatch(createStudent(usersData))
          .unwrap()
          .then(() => {
            toast.success("Created successfully");
            navigate("/students");
          });
  };

  return status === "isLoading" ? (
    <h1>Loading</h1>
  ) : (
    <form onSubmit={handleSave}>
      <Container maxWidth="sm" sx={{ marginTop: "25px" }}>
        <Grid container spacing={3}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 4, mt: 6, textAlign: "center" }}
            >
              {isEdit ? "Edit Student" : "Add Student"}
            </Typography>
          </Box>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isEdit}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isEdit}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isEdit}
              />
              <GroupDropdown
                value={groupNumber}
                onChange={(event) => setGroupNumber(event.target.value)}
              />
            </Stack>
          </Grid>

          <Grid container justifyContent="center">
            <Stack
              direction="row"
              justifyContent="center"
              spacing={3}
              mt={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" variant="contained">
                Save
              </Button>
              <CancelButton endpoint="/students"></CancelButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
