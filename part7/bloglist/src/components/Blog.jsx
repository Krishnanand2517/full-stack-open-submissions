import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <Typography variant='body2'>
        <Link to={`blogs/${blog.id}`}><span className="blog-title">{blog.title}</span></Link> by <span className="blog-author">{blog.author}</span>
      </Typography>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;