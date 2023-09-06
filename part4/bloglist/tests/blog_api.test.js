const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
    {
        title: "Roadmap to GSoC 2024",
        author: "Krish",
        url: "krishawesome.net/gsoc-24-roadmap",
        likes: 23
    },
    {
        title: "How I got into the games industry?",
        author: "Mayank Thakur",
        url: "thakurblog.com/how-i-got-into-games",
        likes: 59
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
});

test("notes are returned as JSON", async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test("all notes are returned", async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
});

test("unique identifier property is named id", async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
});

test("POST request creates a new blog", async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    expect(blogsAtEnd[initialBlogs.length].title).toBe("Canonical string reduction");
});

test("likes default to 0 if missing", async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd[initialBlogs.length].likes).toBe(0);
});

test("if url is missing, respond with code 400", async () => {
    const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

test("if title is missing, respond with code 400", async () => {
    const newBlog = {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

test("deletion succeeds with code 204 if id is valid", async () => {
    const blogsAtStart = await Blog.find({});
    const blogToDelete = blogsAtStart[0];

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
});

test("updating the likes of a blog succeeds with code 200", async () => {
    const response = await api.get('/api/blogs');
    const blogToUpdate = response.body[0]
    const updatedBlog = {...blogToUpdate, likes: blogToUpdate.likes + 1};

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes);
});

afterAll(async () => {
    mongoose.connection.close();
});