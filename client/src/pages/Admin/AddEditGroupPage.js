import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CancelButton } from "../../components/Buttons/CancelButton";
import { Button } from "../../components/Buttons/Button";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createGroup,
  fetchGroupDetails,
  groupSelector,
  updateGroup,
} from "../../components/redux/Groups/groupsSlice";

function AddEditGroupPage() {
  const {
    status: fetchStatus,
    error,
    groupDetails,
  } = useSelector(groupSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = useMemo(() => pathname.includes("editGroup"), [pathname]);
  const [groupName, setGroupName] = useState("");
  const [status, setStatus] = useState("active");
  useEffect(() => {
    if (groupDetails) {
      setStatus(groupDetails.status);
    }
  }, [groupDetails]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    isEdit && id && dispatch(fetchGroupDetails(id));
  }, [isEdit]);

  const handleSave = (event) => {
    event.preventDefault();

    const groupData = {
      numberOfGroupName: Number(groupName),
      status,
      students: [],
    };

    isEdit
      ? dispatch(updateGroup({ body: groupData, id }))
          .unwrap()
          .then(() => {
            toast.success("Updated successfully");
            navigate("/groups");
          })
      : dispatch(createGroup(groupData))
          .unwrap()
          .then(() => {
            toast.success("Created successfully");
            navigate("/groups");
          });
  };

  const handleCancel = () => {
    // Handle cancel action (e.g., navigate back to the student list)
    navigate("/groups");
  };

  return fetchStatus === "isLoading" ? (
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
              {isEdit ? "Edit Group" : "Add Group"}
            </Typography>
          </Box>

          <Grid item xs={12}>
            <TextField
              label="Group Name"
              fullWidth
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              autoComplete="off"
              disabled={isEdit}
            />
          </Grid>
          {isEdit && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Group Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"active"}>active</MenuItem>
                  <MenuItem value={"inactive"}>inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid container justifyContent="center">
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              mt={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" variant="contained">
                Save
              </Button>
              <CancelButton
                onClick={handleCancel}
                variant="outlined"
                color="primary"
              >
                Cancel
              </CancelButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}

export default AddEditGroupPage;
