import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import UserProfilePage from "./pages/userProfilePage/userProfilePage";
import Layout from "./Layout/Layout";
import StudentDashboard from "../src/pages/Students/StudentsDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import TimeSlotPage from "../src/pages/Students/TimeSlotsPage";
import EventManagement from "./pages/Admin/EventManagementPage";
import EditEventPage from "./pages/Admin/EditEventPage";
import AddEventPage from "./pages/Admin/AddEventPage";
import LoginPage from "./pages/LoginPage/Login";
import AddEditStudentPage from "./pages/Admin/AddEditStudentPage";

import GroupManagement from "./pages/Admin/GroupManagement";
import PasswordPage from "./pages/Password/ChangePassword";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import StudentManagementPage from "./pages/Admin/StudentManagementPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectorIsAuth } from "./components/redux/authSlice";
import ForgotPasswordPage from "./pages/Password/ForgotPassword";
import AddEditGroupPage from "./pages/Admin/AddEditGroupPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00897b", // Adjust this to your preferred color
    },
  },
});

const App = () => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  // If user is not authenticated, you can redirect them to the login page
  useEffect(() => {
    if (!window.localStorage.getItem("token") && !isAuth) {
      return <Navigate to="/login" />;
    }
  }, [isAuth, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public routes without layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<PasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected routes with layout */}
        {isAuth && (
          <Route path="/" element={<Layout />}>
            {userData?.admin ? (
              <>
                <Route path="events" element={<EventManagement />} />
                <Route path="events/edit/:id" element={<EditEventPage />} />
                <Route path="events/add" element={<AddEventPage />} />
                <Route path="/" element={<AdminDashboard />} />
                <Route path="addStudent" element={<AddEditStudentPage />} />
                <Route path="addGroup" element={<AddEditGroupPage />} />
                <Route path="groups" element={<GroupManagement />} />
                <Route path="students" element={<StudentManagementPage />} />
                <Route
                  path="students/editStudent/:id"
                  element={<AddEditStudentPage />}
                />
                <Route
                  path="groups/editGroup/:id"
                  element={<AddEditGroupPage />}
                />
                <Route path="user/:id" element={<UserProfilePage />} />
              </>
            ) : (
              <>
                <Route path="user/:id" element={<UserProfilePage />} />
                <Route path="/" element={<StudentDashboard />} />
                <Route
                  path="student/event/timeslots"
                  element={<TimeSlotPage />}
                />
              </>
            )}
          </Route>
        )}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
