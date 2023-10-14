import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Hidden } from "@mui/material";

import AdminCalender from "../../components/Admin/AdminDashboard/CalanderForAllEvents/AdminCalender";
// import { selectorIsAuth } from "../../components/redux/authSlice";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import EventByGroup from "../../components/Admin/AdminDashboard/EventByGroup/EventByGroup";
import PieChartCard from "../../components/Admin/AdminDashboard/PieChart/PieChartCard";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

export default function AdminDashboard() {
  // const isAuth = useSelector(selectorIsAuth);
  // const navigate = useNavigate();

  // if (!isAuth) {
  //   return navigate("/login");
  // }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 4, mt: 6, textAlign: "center" }}
          >
            Admin Dashboard
          </Typography>
          <Grid container spacing={2} rowSpacing={4}>
            <Grid xs={12} lg={8}>
              <Item>
                <EventByGroup />
              </Item>
            </Grid>
            <Hidden lgDown>
              <Grid xs={4}>
                <Item>
                  <PieChartCard />
                </Item>
              </Grid>
            </Hidden>
            <Grid xs={12} md={12} sx={{ mt: 4 }}>
              <Item>
                <AdminCalender />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
