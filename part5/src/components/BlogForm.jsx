import PropTypes from "prop-types";

import { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();

        createBlog({
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
            <h2>Create New Entry</h2>

            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
};

export default BlogForm;