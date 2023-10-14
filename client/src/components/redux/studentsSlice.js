import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../util/axios";

export const fetchAllStudents = createAsyncThunk(
  "/students/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/all");
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);
export const fetchStudentDetails = createAsyncThunk(
  "/students/details",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);
export const createStudent = createAsyncThunk(
  "/students/create",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/register", body);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);
export const updateStudent = createAsyncThunk(
  "/students/update",
  async ({ body, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/api/user/edit-group/${id}`, body);
      return data;
    } catch (error) {
      // Handle the error and return it with rejectWithValue
      return rejectWithValue(error.response.data); // Assuming the error response contains error details
    }
  }
);
export const deleteStudent = createAsyncThunk(
  "/students/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/user/${id}`);
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
  userDetails: null,
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.fulfilled, (state, { payload }) => {
        state.status = "isSuccess";
        state.data = payload;
        state.userDetails = null;
      })
      .addCase(createStudent.fulfilled, (state, { payload }) => {
        state.status = "isSuccess";
        state.userDetails = payload;
      })
      .addCase(updateStudent.fulfilled, (state) => {
        state.status = "isSuccess";
        state.userDetails = null;
        // state.data = state.data.map((student) =>
        //   student._id === payload.userData._id ? payload.userData : student
        // );
      })
      .addCase(fetchStudentDetails.fulfilled, (state, { payload }) => {
        state.status = "isSuccess";
        state.userDetails = payload.userData;
      })
      .addCase(deleteStudent.fulfilled, (state) => {
        state.status = "isSuccess";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "isLoading";
          state.data = null;
          state.error = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.status = "isError";
          state.data = null;
          state.error = Array.isArray(payload)
            ? payload[0].msg
            : payload.message;
        }
      );
  },
  // extraReducers: {
  //   [fetchAllStudents.pending]: (state) => {
  //     state.status = "isLoading";
  //     state.data = null;
  //     state.error = "";
  //   },
  //   [fetchAllStudents.fulfilled]: (state, { payload }) => {
  //     state.status = "isSuccess";
  //     state.data = payload;
  //   },
  //   [fetchAllStudents.rejected]: (state, { payload }) => {
  //     state.status = "isError";
  //     state.data = null;
  //     state.error = payload;
  //   },
  // },
});

export const studentSelector = (state) => state.students;
export const studentsReducer = studentsSlice.reducer;
