import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_BOOKS_OF_GENRE } from "../queries";

const Books = (props) => {
  const allBooksResult = useQuery(ALL_BOOKS);

  const [genre, setGenre] = useState(null);

  const genreBooksResult = useQuery(ALL_BOOKS_OF_GENRE, {
    variables: { genre },
    skip: !genre,
  });

  if (!props.show) {
    return null;
  }

  if (allBooksResult.loading || genreBooksResult.loading) {
    return <div>Loading...</div>;
  }

  const books = genre
    ? genreBooksResult.data.allBooks
    : allBooksResult.data.allBooks;

  const genres = [
    "refactoring",
    "agile",
    "patterns",
    "design",
    "classic",
    "crime",
    "revolution",
  ];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {genres.map((g) => (
        <button onClick={() => setGenre(g)} key={g}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
