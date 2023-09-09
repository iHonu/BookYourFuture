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
import AddStudentPage from "./pages/Admin/AddStudentPage";
import AddGroupPage from "./pages/Admin/AddGroupPage";
import GroupManagement from "./pages/Admin/GroupManagement";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./components/redux/authSlice";
// import { Navigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  // const isAuth = useSelector(selectorIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Layout />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events/" element={<EventManagement />} />
        <Route path="/events/edit/:id" element={<EditEventPage />} />
        <Route path="/events/add" element={<AddEventPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/event/timeslots" element={<TimeSlotPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route path="/addStudent" element={<AddStudentPage />} />
        <Route path="/addGroup" element={<AddGroupPage />} />
        <Route path="/groups" element={<GroupManagement />} />
      </Routes>
    </>
  );
};

export default App;
