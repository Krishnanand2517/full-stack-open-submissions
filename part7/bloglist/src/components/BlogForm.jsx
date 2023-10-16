import PropTypes from "prop-types";

import { useState } from "react";

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
            <h2>Create New Entry</h2>

            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        id="blog-title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        id="blog-author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        id="blog-url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id="create-btn" type="submit">create</button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    newBlogMutation: PropTypes.object.isRequired
};

export default BlogForm;