import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './NotificationContext';
import { useUserDispatch, useUserValue } from './UserContext';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';

import { Container, Typography } from '@mui/material';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users';
import BlogList from './components/BlogList';
import Users from './components/Users';
import User from './components/User';
import BlogView from './components/BlogView';
import NavMenu from './components/NavMenu';


const App = () => {
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const userValue = useUserValue();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const commentBlogMutation = useMutation(blogService.addComment, {
    onMutate: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.map(
        blog => blog.id === updatedBlog.id ? updatedBlog : blog
      ));

      showNotification(`Successfully commented!`);
    },
    onError: (error) => {
      queryClient.invalidateQueries(['blogs']);
      showNotification("could not comment", true);
    }
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');


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

    navigate('/');
  };

  const addComment = async (blogToComment) => {
    const updatedBlog = {
      ...blogToComment,
      comments: blogToComment.comments.concat(comment)
    };

    // commentBlogMutation.mutate({ id: blogToComment.id, comments: updatedBlog.comments });
    commentBlogMutation.mutate(updatedBlog);
    console.log(blogToComment.comments.concat(comment));
    setComment('');
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

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const matchUser = useMatch('/users/:id');
  const matchBlog = useMatch('/blogs/:id');

  if (blogsResult.isLoading) {
    return <div>Loading blogs...</div>
  }

  if (blogsResult.isError) {
    return <div>Blog service not available</div>
  }

  if (usersResult.isLoading) {
    return <div>Loading users...</div>
  }

  if (usersResult.isError) {
    return <div>Users service not available</div>
  }

  const blogs = blogsResult.data;
  const users = usersResult.data;

  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null;

  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null;

  if (!userValue) {
    return (
      <div>
        <Notification />
        {loginForm()}
      </div>
    );
  }

  return (
    <Container>
      <div>
        <NavMenu loggedInUser={userValue} handleLogout={handleLogout} />
        <Notification />
        <Typography variant='h4' sx={{ mt: 1.5 }} gutterBottom>The Bloglist App</Typography>

        <Routes>
          <Route path="/blogs/:id" element={<BlogView
            blog={blog}
            likeBlog={() => likeBlog(blog)}
            removeBlog={() => removeBlog(blog)}
            loggedInUser={userValue}
            comment={comment}
            handleCommentChange={({ target }) => setComment(target.value)}
            postComment={addComment}
          />} />
          <Route path="/users/:id" element={<User user={user} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/" element={<BlogList blogs={blogs} newBlogMutation={newBlogMutation} />} />
        </Routes>
      </div>
    </Container>
  );
};

export default App;