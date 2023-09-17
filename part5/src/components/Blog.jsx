import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, removeBlog, likeBlog }) => {
  const [fullView, setFullView] = useState(false);

  const toggleFullView = () => {
    setFullView(!fullView);
  };

  const blogDetails = () => (
    <div>
      <span className="blog-url">{blog.url}</span> <br />
      <span className="blog-likes">likes {blog.likes}</span> <button onClick={likeBlog}>like</button> <br />
      <span className="blog-user">{user.name}</span> <br />
      <button onClick={removeBlog}>remove</button>
    </div>
  );

  return (
    <div className="blog">
      <span className="blog-title">{blog.title}</span> by <span className="blog-author">{blog.author}</span>
      <button onClick={toggleFullView}>
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