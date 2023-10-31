import { configureStore } from '@reduxjs/toolkit'
import { volunteersSlice } from '../features/volunteers/volunteerSlice'
import { eventsSlice } from '../features/events/eventSlice'


export default configureStore({
  reducer: {
    volunteers: volunteersSlice.reducer,
    events: eventsSlice.reducer,
  },
})