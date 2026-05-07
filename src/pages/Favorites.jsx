import { useEffect, useState } from "react";
import BookListItem from "../components/BookListItem";
import { getFavorites } from "../utils/favorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <section className="content-section">
      <div className="section-header">
        <h1>My Favorite Books</h1>
        <p>Your saved books are stored locally in your browser.</p>
      </div>

      {favorites.length === 0 ? (
        <p className="status-box">You do not have any favorite books yet.</p>
      ) : (
        <div className="book-list">
          {favorites.map((book) => (
          <BookListItem key={book.id || book.key} book={book} /> ))}
        </div>
      )}
    </section>
  );
}
