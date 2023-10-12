import { useState, useEffect, useRef } from 'react';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const Notification = ({ message, isError }) => {
  if (message == null) {
    return null;
  }

  const styleClass = isError ? "message redError" : "message";

  return (
    <div className={styleClass}>
      {message}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (content) => {
    setMessage(content);
    setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 5000);
  };

  const createBlog = async (newBlogObject) => {
    try {
      const createdBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat({ ...createdBlog, user }));

      showNotification(`Added a new blog - ${newBlogObject.title}`);
    } catch {
      setIsError(true);
      showNotification("could not create");
    }

    blogFormRef.current.toggleVisibility();
  };

  const likeBlog = async (blogToLike) => {
    const newBlogObject = {
      ...blogToLike,
      user: blogToLike.user.id,
      likes: blogToLike.likes + 1
    };

    try {
      const updatedBlog = await blogService.update(newBlogObject.id, newBlogObject);

      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
    } catch {
      setIsError(true);
      showNotification("could not like");
    }
  };

  const removeBlog = async (blogToDelete) => {
    if (!window.confirm(`Confirm to remove blog: ${blogToDelete.title}`)) {
      return;
    }

    try {
      await blogService.deleteBlog(blogToDelete.id);
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
      showNotification(`Blog - ${blogToDelete.title} was successfully deleted!`);
    } catch {
      setIsError(true);
      showNotification("could not delete");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setIsError(true);
      showNotification("invalid password or username");
      console.log("error:", exception);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
    window.location.reload();
  };

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleSubmit={handleLogin}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  );

  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  if (!user) {
    return (
      <div>
        <Notification message={message} isError={isError} />
        {loginForm()}
      </div>
    );
  }

  const sortByLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <Notification message={message} isError={isError} />
      <h2>The Bloglist App</h2>
      <p>{user.name} logged in
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
      </p>

      {blogForm()}

      <h2>Blogs</h2>
      {blogs.sort(sortByLikes).map(blog =>
        <Blog key={blog.id}
          blog={blog}
          user={blog.user}
          loggedInUser={user}
          removeBlog={() => removeBlog(blog)}
          likeBlog={() => likeBlog(blog)}
        />
      )}
    </div>
  );
};

export default App;