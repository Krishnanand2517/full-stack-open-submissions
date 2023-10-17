import { Button, TextField, Typography } from '@mui/material';

const BlogView = ({ blog, likeBlog, removeBlog, loggedInUser, postComment, comment, handleCommentChange }) => {
    if (!blog || !loggedInUser) return null;

    const handleSubmit = (event) => {
        event.preventDefault();

        postComment(blog);
    };

    let commentCounter = 0;

    return (
        <div>
            <div>
                <Typography variant='h5' gutterBottom>{blog.title}</Typography>
                <a href="#">{blog.url}</a>
                <br /><br />
                {blog.likes} likes
                <Button variant='outlined' color='primary' size='small' sx={{ p: 0, ml: 1 }} onClick={likeBlog}>
                    like
                </Button>
                <br />
                added by {blog.user.name || loggedInUser.name}<br />
                {
                    loggedInUser.name === blog.user.name || !blog.user.name
                        ? <p><Button variant='contained' color='error' size='small' onClick={removeBlog}>delete</Button></p>
                        : null
                }
            </div>
            <div>
                <h3>Comments</h3>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Comment"
                        variant='standard'
                        size='small'
                        name="comment"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <Button variant='contained' color='primary' type="submit" sx={{ mt: 1, ml: 0.5 }}>
                        add comment
                    </Button>
                </form>

                <ul>
                    {
                        blog.comments.map(comment => (
                            <li key={commentCounter++}>{comment}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default BlogView;