import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Grid,
  Container,
  Stack,
  Box,
} from "@mui/material";
import { CancelButton } from "../../components/Buttons/CancelButton";
import { Button } from "../../components/Buttons/Button";
import { toast } from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

export default function AddStudentPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [groupNumber, setGroupNumber] = useState("");

  const { performFetch, error } = useFetch("/auth/register", () => {
    // eslint-disable-next-line no-console
    toast.success("Student added successfully");
    // setFirstName("");
    // setLastName("");
    // setEmail("");
    // setGroupNumber("");
  });
  // eslint-disable-next-line no-console
  console.log(error);
  const handleSave = (event) => {
    event.preventDefault();
    const usersData = {
      firstName: firstName,
      lastName: lastName,
      group: [""],
      passwordHash: "hsdkhdshdlash",
      email: email,
    };
    // eslint-disable-next-line no-console
    console.log(usersData);
    performFetch(usersData, "POST");
  };

  // const handleCancel = () => {
  //   // Handle cancel action (e.g., navigate back to the student list)
  // };

  return (
    <form onSubmit={handleSave}>
      <Container maxWidth="md" sx={{ marginTop: "25px" }}>
        <Grid container spacing={3}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 4, mt: 6, textAlign: "center" }}
            >
              Add Student
            </Typography>
          </Box>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>Group Number</InputLabel>
                <Select
                  value={groupNumber}
                  onChange={(e) => setGroupNumber(e.target.value)}
                >
                  <MenuItem value={43}>43</MenuItem>
                  <MenuItem value={44}>44</MenuItem>
                  <MenuItem value={45}>45</MenuItem>
                  <MenuItem value={46}>46</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid container justifyContent="center">
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              mt={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="outlined">Save</Button>
              <CancelButton variant="contained">Cancel</CancelButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
