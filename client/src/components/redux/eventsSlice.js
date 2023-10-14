import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../util/axios";

export const fetchAllEvents = createAsyncThunk("/events/all", async () => {
  try {
    const { data } = await axios.get("/api/event/all");
    return data;
  } catch (error) {
    // Handle the error and return it with rejectWithValue
    return error.response.data; // Assuming the error response contains error details
  }
});

const initialState = {
  data: null,
  status: "isLoading",
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllEvents.pending]: (state) => {
      state.status = "isLoading";
      state.data = null;
    },
    [fetchAllEvents.fulfilled]: (state, action) => {
      state.status = "isSuccess";
      state.data = action.payload;
    },
    [fetchAllEvents.rejected]: (state) => {
      state.status = "isError";
      state.data = null;
    },
  },
});

// export const selectorIsAuth = (state) => Boolean(state.auth.data);

export const eventsReducer = eventsSlice.reducer;
