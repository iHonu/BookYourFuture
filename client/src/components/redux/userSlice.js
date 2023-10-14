import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../util/axios";

export const getOneUser = createAsyncThunk("user/getOne", async (id) => {
  const { data } = await axios.get(`/api/user/${id}/`);
  return data;
});

export const editUserInfo = createAsyncThunk(
  "/user/edit-user-info",
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/api/user/edit/${id}`, params);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);

export const getDeleteUser = createAsyncThunk("user/getDelete", async (id) => {
  const { data } = await axios.delete(`/api/user/${id}/`);
  return data;
});

const initialState = {
  data: null,
  status: "isLoading",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // Get one
    [getOneUser.pending]: (state) => {
      state.status = "isLoading";
      state.data = null;
    },
    [getOneUser.fulfilled]: (state, action) => {
      state.status = "isSuccess";
      state.data = action.payload;
    },
    [getOneUser.rejected]: (state) => {
      state.status = "isError";
      state.data = null;
    },
    // Edit
    [editUserInfo.pending]: (state) => {
      state.status = "isLoading";
      state.data = null;
    },
    [editUserInfo.fulfilled]: (state, action) => {
      state.status = "isSuccess";
      state.data = action.payload;
    },
    [editUserInfo.rejected]: (state, action) => {
      state.status = "isError";
      state.data = action.payload;
    },
    // Delete
    [getDeleteUser.pending]: (state) => {
      state.status = "isLoading";
      state.data = null;
    },
    [getDeleteUser.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getDeleteUser.rejected]: (state) => {
      state.status = "isError";
    },
  },
});

// export const selectorIsAuth = (state) => Boolean(state.auth.data);

export const userReducer = userSlice.reducer;
