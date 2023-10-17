import { useRef } from 'react';
import Blog from './Blog';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { Typography } from '@mui/material';

const BlogList = ({ blogs, newBlogMutation }) => {
    const blogFormRef = useRef();

    const blogForm = () => (
        <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm newBlogMutation={newBlogMutation} />
        </Togglable>
    );

    const sortByLikes = (a, b) => b.likes - a.likes;

    return (
        <div>
            {blogForm()}
            <br />
            <Typography variant='h5' gutterBottom>Blogs</Typography>
            {
                blogs.sort(sortByLikes).map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                    />
                )
            }
        </div>
    );
};

export default BlogList;