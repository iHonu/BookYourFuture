import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../util/axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchAuth",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/login", params);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/api/user/");
  return data;
});

const initialState = {
  data: null,
  status: "isLoading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = "isLoading";
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.status = "isSuccess";
      state.data = action.payload;
    },
    [fetchUserData.rejected]: (state, action) => {
      state.status = "isError";
      state.data = action.payload;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "isLoading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "isSuccess";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "isError";
      state.data = null;
    },
  },
});

export const selectorIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
