import { createSlice } from '@reduxjs/toolkit';

const initialState = "Hi there!";

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        removeNotification(state, action) {
            return null;
        }
    }
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;