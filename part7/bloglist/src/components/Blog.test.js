import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author", () => {
    const blog = {
        title: "Good Blog",
        author: "Great Man",
        url: "bestsite.co.net",
        likes: 168
    };

    render(<Blog blog={blog} />);

    const blogTitle = screen.getByText("Good Blog");
    const blogAuthor = screen.getByText("Great Man");
    expect(blogTitle).toBeDefined();
    expect(blogAuthor).toBeDefined();
});

test("clicking the button shows the url and likes", async () => {
    const blog = {
        title: "Good Blog",
        author: "Great Man",
        url: "bestsite.co.net",
        likes: 168
    };

    const blogUser = {
        name: "Myself Me",
        username: "mine123",
        password: "mypassword"
    };

    render(<Blog blog={blog} user={blogUser} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const blogUrl = screen.getByText("bestsite.co.net");
    const blogLikes = screen.getByText("likes 168");
    expect(blogUrl).toBeDefined();
    expect(blogLikes).toBeDefined();
});

test("clicking like button calls event handler twice", async () => {
    const blog = {
        title: "Good Blog",
        author: "Great Man",
        url: "bestsite.co.net",
        likes: 168
    };

    const blogUser = {
        name: "Myself Me",
        username: "mine123",
        password: "mypassword"
    };

    const mockHandler = jest.fn();

    render(<Blog blog={blog} user={blogUser} likeBlog={mockHandler} />);

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
});