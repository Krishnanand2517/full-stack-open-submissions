import { Typography } from '@mui/material';

const User = ({ user }) => {
    if (!user) return null;

    return (
        <div>
            <Typography variant='h5' gutterBottom>{user.name}</Typography>
            <Typography variant='body1'>added blogs</Typography>
            <ul>
                {
                    user.blogs.map(blog => (
                        <li key={blog.id}>{blog.title}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default User;