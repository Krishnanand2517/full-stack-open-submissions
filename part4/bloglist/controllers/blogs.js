const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }

    return null;
};

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
    const blogId = request.params.id;

    const blog = await Blog.findById(blogId).populate('user', { username: 1, name: 1 });
    response.json(blog);
});

blogsRouter.get('/:id/comments', async (request, response) => {
    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);

    const comments = blog.comments;
    response.json(comments);
});

blogsRouter.post('/:id/comments', async (request, response) => {
    const blogId = request.params.id;
    const comments = request.body;
    const blog = await Blog.findById(blogId);

    blog.comments = comments;
    const updatedBlog = await blog.save();
    response.status(201).json(updatedBlog);
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(400).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    });

    if (!blog.likes) {
        blog.likes = 0;
    }

    if (blog.title && blog.url) {
        const savedBlog = await blog.save();

        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);
    } else {
        response.status(400).end();
    }
});

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const blog = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        { new: true, context: 'query' }
    ).populate('user', { username: 1, name: 1 });

    response.json(updatedBlog);
});

module.exports = blogsRouter;