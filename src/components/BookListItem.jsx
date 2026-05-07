import { Link } from "react-router-dom";

export default function BookListItem({ book }) {
const cover =
  book.formats?.["image/jpeg"] ||
  "https://via.placeholder.com/120x170?text=No+Cover";
  
const authors =
    book.authors?.map((author) => author.name).join(", ") || "Unknown author";

  return (
    <article className="book-row">
      <img src={cover} alt={book.title} className="book-row-cover" loading="lazy"  decoding="async" />

      <div className="book-row-content">
        <h2>{book.title}</h2>
        <p className="muted-text">
          <strong>Author:</strong> {authors}
        </p>
        <p className="muted-text">
          <strong>Language:</strong> {book.languages?.join(", ") || "Unknown"}
        </p>
        <p className="muted-text">
          <strong>Downloads:</strong> {book.download_count}
        </p>
      </div>

      <div className="book-row-actions">
        <Link to={`/book/${book.id}`} className="secondary-btn">
          View Details
        </Link>
      </div>
    </article>
  );
}