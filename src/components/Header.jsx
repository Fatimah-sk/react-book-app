import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const categories = [
  "",
  "fiction",
  "mystery",
  "thriller",
  "romance",
  "fantasy",
  "morality",
  "society",
  "power",
  "justice",
  "adventure",
  "tragedy",
  "war",
  "philosophy",
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("topic") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("topic") || "");
  }, [searchParams]);

  function handleSubmit(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (category.trim()) params.set("topic", category.trim());

    navigate(`/?${params.toString()}`);
  }

  function handleCategoryChange(e) {
    const value = e.target.value;
    setCategory(value);

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (value.trim()) params.set("topic", value.trim());

    navigate(`/?${params.toString()}`);
  }

  const onFavoritesPage = location.pathname === "/favorites";

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-block">
          <Link to="/" className="brand-title">
            Classic Books Library
          </Link>
          <p className="brand-subtitle">
            Explore timeless books, save your favorites, and read online.
          </p>
        </div>

        <div className="header-actions">
          <Link to={onFavoritesPage ? "/" : "/favorites"} className="favorites-link">
            {onFavoritesPage ? "Home" : "Favorites"}
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="search-panel">
        <div className="field-group">
          <label htmlFor="book-search">Search by book title</label>
          <input
            id="book-search"
            type="text"
            placeholder="Enter a book title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="category-select">Filter by category</label>
          <select
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((item) => (
              <option key={item || "all"} value={item}>
                {item ? item.charAt(0).toUpperCase() + item.slice(1) : "All categories"}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="primary-btn">
          Search
        </button>
      </form>
    </header>
  );
}