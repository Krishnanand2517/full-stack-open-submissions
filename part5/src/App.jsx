import { useState, useEffect } from 'react';
import Blog from './components/Blog';
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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(null);

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
    }
  }, []);

  const showNotification = (content) => {
    setMessage(content);
    setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 5000);
  };

  const createBlog = async (event) => {
    event.preventDefault();

    const newBlogObject = {
      title: title,
      author: author,
      url: url
    };

    try {
      const createdBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(createdBlog));
      showNotification(`Added a new blog - ${title}`);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      setIsError(true);
      showNotification("could not perform the action");
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
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={createBlog}>
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
      <button type="submit">Create</button>
    </form>
  );

  if (!user) {
    return (
      <div>
        <Notification message={message} isError={isError} />
        <h2>Login to the application</h2>
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <Notification message={message} isError={isError} />
      <h2>The Bloglist App</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>Create New Entry</h2>
      {blogForm()}
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default App;