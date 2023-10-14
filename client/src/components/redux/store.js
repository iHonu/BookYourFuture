import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { userReducer } from "./userSlice";
import { passwordReducer } from "./passwordSlice";
import { eventsReducer } from "./eventsSlice";
import { studentsReducer } from "./studentsSlice";
import { groupsReducer } from "./Groups/groupsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    password: passwordReducer,
    events: eventsReducer,
    students: studentsReducer,
    groups: groupsReducer,
  },
});

export default store;
