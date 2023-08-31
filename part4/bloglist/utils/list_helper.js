const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => {
        return sum + blog.likes;
    }, 0);

    return blogs.length === 0
        ? 0
        : total;
};

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes);
    const maxLikes = Math.max(...likes)

    return blogs.length === 0
        ? null
        : blogs.find((blog) => blog.likes === maxLikes);
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};