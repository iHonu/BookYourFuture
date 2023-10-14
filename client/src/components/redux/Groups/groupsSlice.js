import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../util/axios";
import { handleFulfilled, handlePending, handleRejected } from "./helpers";

export const fetchAllGroups = createAsyncThunk(
  "/groups/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/group/all");
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);
export const fetchGroupDetails = createAsyncThunk(
  "/groups/details",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/group/${id}`);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);
export const createGroup = createAsyncThunk(
  "/groups/create",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/group/add", body);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);
export const updateGroup = createAsyncThunk(
  "/groups/update",
  async ({ body, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/api/group/edit/${id}`, body);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);
export const deleteGroup = createAsyncThunk(
  "/groups/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/group/${id}`);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: "",
  groupDetails: null,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGroups.fulfilled, (state, { payload }) => {
        state.data = payload;
      })

      .addCase(fetchGroupDetails.fulfilled, (state, { payload }) => {
        state.groupDetails = payload.userData; //!
      })

      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        handleFulfilled
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        handleRejected
      );
  },
});

export const groupsReducer = groupsSlice.reducer;
export const groupSelector = (state) => state.groups;
