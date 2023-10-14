import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../util/axios";

export const changePasswordUser = createAsyncThunk(
  "/user/changePassword",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/change-password", params);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  "/user/forgot-password",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/user/forgot-password/", params);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);

const initialState = {
  data: null,
  status: "isLoading",
};

export const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: { resetState: () => initialState },
  extraReducers: {
    // Change password
    [changePasswordUser.pending]: (state) => {
      state.status = "isLoading";
      state.data = null;
    },
    [changePasswordUser.fulfilled]: (state, action) => {
      state.status = "isSuccess";
      state.data = action.payload;
    },
    [changePasswordUser.rejected]: (state, action) => {
      state.status = "isError";
      state.data = action.payload;
    },
    // Forgot password
    [forgotPasswordUser.pending]: (state) => {
      state.status = "isLoading";
      state.data = null;
    },
    [forgotPasswordUser.fulfilled]: (state, action) => {
      state.status = "isSuccess";
      state.data = action.payload;
    },
    [forgotPasswordUser.rejected]: (state, action) => {
      state.status = "isError";
      state.data = action.payload;
    },
  },
});

// export const selectorIsAuth = (state) => Boolean(state.auth.data);

export const passwordReducer = passwordSlice.reducer;
export const { resetState } = passwordSlice.actions;
