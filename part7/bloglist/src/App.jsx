import { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs, addBlog, likeBlog, removeBlog } from './reducers/blogReducer';
import { login, logout, getLoggedInUser } from './reducers/loginReducer';


const App = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.login);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);


  const handleCreateBlog = async (newBlogObject) => {
    try {
      dispatch(addBlog(newBlogObject));

      dispatch(setNotification(`Added a new blog - ${newBlogObject.title}`, 5));
    } catch {
      dispatch(setNotification("could not create", 5, true));
    }

    blogFormRef.current.toggleVisibility();
  };

  const handleLikeBlog = async (blogToLike) => {
    const newBlogObject = {
      ...blogToLike,
      user: blogToLike.user.id,
      likes: blogToLike.likes + 1
    };

    try {
      dispatch(likeBlog(newBlogObject));
    } catch {
      dispatch(setNotification("could not like", 5, true));
    }
  };

  const handleRemoveBlog = async (blogToDelete) => {
    if (!window.confirm(`Confirm to remove blog: ${blogToDelete.title}`)) {
      return;
    }

    try {
      dispatch(removeBlog(blogToDelete));
      dispatch(setNotification(`Blog - ${blogToDelete.title} was successfully deleted!`, 5));
    } catch {
      dispatch(setNotification("could not delete", 5, true));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(login(username, password));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification("invalid password or username", 5, true));
      console.log("error:", exception);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
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
      <BlogForm createBlog={handleCreateBlog} />
    </Togglable>
  );

  if (!user) {
    return (
      <div>
        <Notification />
        {loginForm()}
      </div>
    );
  }

  const sortByLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <Notification />
      <h2>The Bloglist App</h2>
      <p>{user.name} logged in
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
      </p>

      {blogForm()}

      <h2>Blogs</h2>
      {[...blogs].sort(sortByLikes).map(blog =>
        <Blog key={blog.id}
          blog={blog}
          user={blog.user}
          loggedInUser={user}
          removeBlog={() => handleRemoveBlog(blog)}
          likeBlog={() => handleLikeBlog(blog)}
        />
      )}
    </div>
  );
};

export default App;