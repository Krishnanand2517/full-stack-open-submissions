import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = (props) => {
  const booksDetails = useQuery(ALL_BOOKS);
  const userDetails = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (booksDetails.loading || userDetails.loading) {
    return <div>Loading...</div>;
  }

  const books = booksDetails.data.allBooks;
  const user = userDetails.data.me;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            if (a.genres.includes(user.favoriteGenre)) {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
