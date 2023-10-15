import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const initialState = [];

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        appendBlog(state, action) {
            state.push(action.payload);
        }
    }
});

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const addBlog = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject);
        dispatch(appendBlog(newBlog));
    };
};

export const likeBlog = (blogToLike) => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        const likedBlog = await blogService.update(blogToLike.id, blogToLike);
        const updatedBlogs = blogs.map(blog => blog.id === likedBlog.id ? likedBlog : blog)

        dispatch(setBlogs(updatedBlogs));
    };
};

export const removeBlog = (blogToRemove) => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        await blogService.deleteBlog(blogToRemove.id);
        const updatedBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
        
        dispatch(setBlogs(updatedBlogs));
    };
};

export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;