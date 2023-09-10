const Blog = ({ blog }) => (
  <div>
    <span>{blog.title}</span> by {blog.author}
  </div>
);

export default Blog;