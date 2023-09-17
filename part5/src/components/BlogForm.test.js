import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("when new blog is created, the form calls event handler with right details", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector("#blog-title");
    const authorInput = container.querySelector("#blog-author");
    const urlInput = container.querySelector("#blog-url");
    const createButton = container.querySelector("#create-btn");

    await user.type(titleInput, "Good Blog");
    await user.type(authorInput, "Great Man");
    await user.type(urlInput, "bestsite.co.net");
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("Good Blog");
    expect(createBlog.mock.calls[0][0].author).toBe("Great Man");
    expect(createBlog.mock.calls[0][0].url).toBe("bestsite.co.net");
});