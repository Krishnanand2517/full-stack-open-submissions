import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const initialState = null;

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload;
        }
    }
});

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password });

        window.localStorage.setItem(
            'loggedBloglistUser', JSON.stringify(user)
        );

        blogService.setToken(user.token);
        dispatch(setUser(user));
    };
};

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBloglistUser');
        window.location.reload();
        dispatch(setUser(null));
    };
};

export const getLoggedInUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
        
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    };
};

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;