import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, user, removeBlog, likeBlog }) => {
  const [fullView, setFullView] = useState(false);

  const toggleFullView = () => {
    setFullView(!fullView);
  };

  const blogDetails = () => (
    <div>
      {blog.url} <br />
      likes {blog.likes} <button onClick={likeBlog}>like</button> <br />
      {user.name} <br />
      <button onClick={removeBlog}>remove</button>
    </div>
  );

  return (
    <div className="blog">
      <span>{blog.title}</span> by {blog.author}
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