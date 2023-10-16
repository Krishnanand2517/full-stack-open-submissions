import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './NotificationContext';
import { useUserDispatch, useUserValue } from './UserContext';

import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const userValue = useUserValue();
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));

      showNotification(`Added a new blog - ${newBlog.title}`);
    },
    onError: (error) => {
      showNotification("could not create", true);
    }
  });

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.map(
        blog => blog.id === updatedBlog.id ? updatedBlog : blog
      ));
    },
    onError: (error) => {
      showNotification("could not like", true);
    }
  });

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onMutate: (deletedBlog) => {
      // Optimistically updating using 'onMutate'
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.filter(
        blog => blog.id !== deletedBlog.id
      ));

      showNotification(`Blog - ${deletedBlog.title} was successfully deleted!`);
    },
    onError: (error) => {
      // Revert in case of any errors
      queryClient.invalidateQueries(['blogs']);
      showNotification("could not delete", true);
    }
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'SIGN_IN', payload: loggedUser });
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const showNotification = (content, isError = false, duration = 5000) => {
    notificationDispatch({ type: 'SHOW', payload: { content, isError } });

    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' });
    }, duration);
  };

  const likeBlog = async (blogToLike) => {
    updateBlogMutation.mutate({ id: blogToLike.id, likes: blogToLike.likes + 1 });
  };

  const removeBlog = async (blogToDelete) => {
    if (!window.confirm(`Confirm to remove blog: ${blogToDelete.title}`)) {
      return;
    }
    deleteBlogMutation.mutate(blogToDelete);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      userDispatch({ type: 'SIGN_IN', payload: user });
      setUsername('');
      setPassword('');
    } catch (exception) {
      showNotification("invalid password or username", true);
      console.log("error:", exception);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBloglistUser');
    userDispatch({ type: 'SIGN_OUT' });
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
      <BlogForm newBlogMutation={newBlogMutation} />
    </Togglable>
  );


  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return <div>Loading blogs...</div>
  }

  if (result.isError) {
    return <div>Blog service not available</div>
  }

  const blogs = result.data;

  if (!userValue) {
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
      <p>{userValue.name} logged in
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
          loggedInUser={userValue}
          removeBlog={() => removeBlog(blog)}
          likeBlog={() => likeBlog(blog)}
        />
      )}
    </div>
  );
};

export default App;