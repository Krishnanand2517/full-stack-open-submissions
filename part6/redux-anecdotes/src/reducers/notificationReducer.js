import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload;
        },
        removeNotification(state, action) {
            return null;
        }
    }
});

export const setNotification = (content, duration) => {
    return async dispatch => {
        dispatch(showNotification(content));
        setTimeout(() => {
            dispatch(removeNotification());
        }, duration * 1000);
    };
};

export const { showNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;