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
  Typography,
  Hidden,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import DeleteButton from "../../components/Buttons/DeleteButton";
import { useNavigate } from "react-router-dom";
import { fetchAllGroups } from "../../components/redux/Groups/groupsSlice";
import { useDispatch } from "react-redux";

export default function GroupManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllGroups());
    performFetch();
    // eslint-disable-next-line no-console
    console.log(error);
  }, []);

  const { performFetch, error, isLoading } = useFetch(
    "/group/all",
    (result) => {
      // eslint-disable-next-line no-console
      console.log(result);
      setData(result.groupsData);
    }
  );

  const handleEditClick = (id) => {
    navigate(`editGroup/${id}`);
    // eslint-disable-next-line no-console
    console.log(`Edit clicked for ID ${id}`);
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 16 }}>
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
              Group Management
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "20px",
            }}
          >
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="contained"
              onClick={() => {
                navigate("/addGroup");
              }}
              sx={{ mt: 2, mb: 1 }}
            >
              Add
              <Hidden mdDown> Group</Hidden>
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Group</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Creation Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.numberOfGroupName}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" justifyContent="flex-end">
                        <IconButton
                          onClick={() => handleEditClick(item._id)}
                          sx={{ mr: { xs: 1, sm: 3 } }}
                        >
                          <EditIcon sx={{ color: "grey" }} />
                        </IconButton>

                        <DeleteButton
                          id={item._id}
                          page="group"
                          reFetch={performFetch}
                          titleConfirm={"Delete group"}
                          contentConfirm={`Are you sure you want to delete a group ${item.numberOfGroupName}?`}
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
