import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async () => {
    const response = await axios.get(
      "https://event-management-8q3o.onrender.com/api/event"
    );
    return response.data;
  }
);

export const addEventAsync = createAsyncThunk(
  "event/addEventAsync",
  async (newEvent) => {
    const response = await axios.post(
      "https://event-management-8q3o.onrender.com/api/event",
      newEvent
    );
    return response.data;
  }
);

export const updateEventAsync = createAsyncThunk(
  "events/updateEventAsync",
  async ({ id, updatedEvent }) => {
    const response = await axios.post(
      `https://event-management-8q3o.onrender.com/api/event/update/${id}`,
      updatedEvent
    );
    return response.data;
  }
);

export const deleteEventAsync = createAsyncThunk(
  "events/deleteEventAsync",
  async (id) => {
    const response = await axios.delete(
      `https://event-management-8q3o.onrender.com/api/event/${id}`
    );
    return response.data;
  }
);

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = action.payload;
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addEventAsync.fulfilled]: (state, action) => {
      state.status = "idle";
      state.events.push(action.payload);
    },
    [addEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;
      const index = state.events.findIndex((s) => s._id === updatedEvent._id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    [updateEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        (event) => event._id !== action.payload._id
      );
    },
    [deleteEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});