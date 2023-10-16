import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, loggedInUser, removeBlog, likeBlog }) => {
  const [fullView, setFullView] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  const toggleFullView = () => {
    setFullView(!fullView);

    if (loggedInUser.name === user.name || !user.name) {
      setCanDelete(true);
    } else {
      setCanDelete(false);
    }
  };

  const removeButton = () => (
    <button id="remove-button" onClick={removeBlog}>
      remove
    </button>
  );

  const blogDetails = () => (
    <div>
      <span className="blog-url">{blog.url}</span> <br />
      <span className="blog-likes">likes {blog.likes}</span> <button id="like-button" onClick={likeBlog}>like</button> <br />
      <span className="blog-user">{user.name || loggedInUser.name}</span> <br />

      {canDelete ? removeButton() : null}
    </div>
  );

  return (
    <div className="blog">
      <span className="blog-title">{blog.title}</span> by <span className="blog-author">{blog.author}</span>
      <button id="view-button" onClick={toggleFullView}>
        {fullView ? "hide" : "view"}
      </button>
      {fullView ? blogDetails() : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired
};

export default Blog;