import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buildBookDetailsUrl, fetchBooks } from "../utils/api";
import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from "../utils/favorites";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchBooks(buildBookDetailsUrl(id));
        const currentBook = data.results?.[0] || null;

        setBook(currentBook);

        if (currentBook) {
          setFavorite(isFavorite(currentBook.id));
        }
      } catch (err) {
        setError(err.message || "Failed to load book details.");
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  function toggleFavorite() {
    if (!book) return;

    if (favorite) {
      removeFavorite(book.id);
      setFavorite(false);
    } else {
      addFavorite(book);
      setFavorite(true);
    }
  }

  if (loading) return <p className="status-box">Loading book details...</p>;
  if (error) return <p className="error-box">{error}</p>;
  if (!book) return <p className="status-box">Book not found.</p>;

  const cover =
    book.formats?.["image/jpeg"] || "https://via.placeholder.com/260x380?text=No+Cover";
  const authors =
    book.authors?.map((author) => author.name).join(", ") || "Unknown author";
  const subjects = book.subjects?.slice(0, 8).join(", ") || "No category available";
  const languages = book.languages?.join(", ") || "Unknown";
  const readUrl =
      book.formats?.["text/html"] ||
      book.formats?.["application/epub+zip"] ||
      book.formats?.["text/plain; charset=us-ascii"] ||
      book.formats?.["text/plain; charset=utf-8"] ||
      book.formats?.["text/plain"] ||
      "#";

  return (
    <section className="details-card">
      <div className="details-cover-box">
        <img src={cover} alt={book.title} className="details-cover" />
      </div>

      <div className="details-content">
        <h1>{book.title}</h1>

        <div className="details-grid">
          <p><strong>Author:</strong> {authors}</p>
          <p><strong>Downloads:</strong> {book.download_count}</p>
          <p><strong>Language:</strong> {languages}</p>
          <p><strong>Category:</strong> {subjects}</p>
        </div>

        <div className="details-actions">
          <button className="primary-btn" onClick={toggleFavorite}>
            {favorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

          <a
            href={readUrl}
            target="_blank"
            rel="noreferrer"
            className="secondary-btn"
          >
            Read Book
          </a>
        </div>
      </div>
    </section>
  );
}