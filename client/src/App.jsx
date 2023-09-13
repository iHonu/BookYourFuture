import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfilePage from "./pages/userProfilePage/userProfilePage";
import Layout from "./Layout/Layout";
import StudentDashboard from "../src/pages/Students/StudentsDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import TimeSlotPage from "../src/pages/Students/TimeSlotsPage";
import EventManagement from "./pages/Admin/EventManagementPage";
import EditEventPage from "./pages/Admin/EditEventPage";
import AddEventPage from "./pages/Admin/AddEventPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AddEditStudentPage from "./pages/Admin/AddEditStudentPage";
import AddGroupPage from "./pages/Admin/AddGroupPage";
import GroupManagement from "./pages/Admin/GroupManagement";
import PasswordPage from "./pages/Password/PasswordPage";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import StudentManagementPage from "./pages/Admin/StudentManagementPage";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./components/redux/authSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00897b", // Adjust this to your preferred color
    },
  },
});

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Layout />
        <Routes>
          <Route path="/change-password" element={<PasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events/" element={<EventManagement />} />
          <Route path="/events/edit/:id" element={<EditEventPage />} />
          <Route path="/events/add" element={<AddEventPage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/event/timeslots" element={<TimeSlotPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/addStudent" element={<AddEditStudentPage />} />

          <Route path="/addGroup" element={<AddGroupPage />} />
          <Route path="/groups" element={<GroupManagement />} />
          <Route path="/students" element={<StudentManagementPage />} />
          <Route
            path="/students/editStudent/:id"
            element={<AddEditStudentPage />}
          />
        </Routes>
      </>
    </ThemeProvider>
  );
};

export default App;
