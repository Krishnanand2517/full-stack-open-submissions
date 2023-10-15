import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = (createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            console.log(action.payload);
            return action.payload;
        },
        removeNotification(state, action) {
            return null;
        }
    }
}));

export const setNotification = (content, duration, isError = false) => {
    return async dispatch => {
        dispatch(showNotification({ content, isError }));
        setTimeout(() => {
            dispatch(removeNotification());
        }, duration * 1000);
    };
};

export const { showNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;