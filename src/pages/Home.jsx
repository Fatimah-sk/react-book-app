import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookListItem from "../components/BookListItem";
import PagePagination from "../components/PagePagination";
import { buildHomeUrl, fetchBooks } from "../utils/api";

export default function Home() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const topic = searchParams.get("topic") || "";

  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [search, topic]);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError("");

        const baseUrl = buildHomeUrl(search, topic);
        const separator = baseUrl.includes("?") ? "&" : "?";
        const url = `${baseUrl}${separator}page=${currentPage}`;

        const data = await fetchBooks(url);
        setBooks(data.results || []);
        setCount(data.count || 0);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [search, topic, currentPage]);

  const pageTitle = search
    ? `Search results for "${search}"`
    : topic
    ? `${topic.charAt(0).toUpperCase() + topic.slice(1)} Books`
    : "Popular Books";

  return (
    <section className="content-section">
      <div className="section-header">
        <h1>{pageTitle}</h1>
        <p>
          Browse books, open details, add favorites, and read online in a clean
          and simple interface.
        </p>
      </div>

      {loading && <p className="status-box">Loading books...</p>}
      {error && <p className="error-box">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="status-box">No books found.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <div className="book-list">
            {books.map((book) => (
              <BookListItem key={book.id} book={book} />
            ))}
          </div>

          <PagePagination
            count={count}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}