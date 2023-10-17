import PropTypes from 'prop-types';
import { useState } from 'react';

import { Button, TextField, Typography } from '@mui/material';

const BlogForm = ({ newBlogMutation }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();

        newBlogMutation.mutate({
            title: title,
            author: author,
            url: url
        });

        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <div>
            <Typography variant='h5' gutterBottom>Create New Entry</Typography>

            <form onSubmit={addBlog}>
                <div>
                    <TextField
                        label="Title"
                        variant='standard'
                        size='small'
                        value={title}
                        name="Title"
                        id="blog-title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="Author"
                        variant='standard'
                        size='small'
                        value={author}
                        name="Author"
                        id="blog-author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="URL"
                        variant='standard'
                        size='small'
                        value={url}
                        name="URL"
                        id="blog-url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <br />
                <Button variant='contained' color='secondary' id="create-btn" type="submit">
                    create
                </Button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    newBlogMutation: PropTypes.object.isRequired
};

export default BlogForm;