import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVolunteers = createAsyncThunk(
  "volunteer/fetchVolunteers",
  async () => {
    const response = await axios.get(
      "https://event-management-8q3o.onrender.com/api/volunteer"
    );
    return response.data;
  }
);

export const addVolunteerAsync = createAsyncThunk(
  "volunteer/addVolunteerAsync",
  async (newVolunteer) => {
    const response = await axios.post(
      "https://event-management-8q3o.onrender.com/api/volunteer",
      newVolunteer
    );
    return response.data;
  }
);

export const updateVolunteerAsync = createAsyncThunk(
  "volunteers/updateVolunteerAsync",
  async ({ id, updatedVolunteer }) => {
    const response = await axios.post(
      `https://event-management-8q3o.onrender.com/api/volunteer/update/${id}`,
      updatedVolunteer
    );
    return response.data;
  }
);

export const deleteVolunteerAsync = createAsyncThunk(
  "volunteers/deleteVolunteerAsync",
  async (id) => {
    const response = await axios.delete(
      `https://event-management-8q3o.onrender.com/api/volunteer/${id}`
    );
    return response.data;
  }
);

const initialState = {
  volunteers: [],
  status: "idle",
  error: null,
};

export const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchVolunteers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = action.payload;
    },
    [fetchVolunteers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "idle";
      state.volunteers.push(action.payload);
    },
    [addVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload;
      const index = state.volunteers.findIndex((s) => s._id === updatedVolunteer._id);
      if (index !== -1) {
        state.volunteers[index] = updatedVolunteer;
      }
    },
    [updateVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "idle";
      state.volunteers = state.volunteers.filter(
        (volunteer) => volunteer._id !== action.payload._id
      );
    },
    [deleteVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});