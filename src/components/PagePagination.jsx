export default function PagePagination({
  count,
  currentPage,
  onPageChange,
}) {
  const booksPerPage = 32;
  const totalPages = Math.ceil(count / booksPerPage);

  if (totalPages <= 1) return null;

  function getVisiblePages() {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  }

  const visiblePages = getVisiblePages();

  return (
    <div className="page-nav-wrapper">
      <button
        className="page-arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      <div className="page-numbers">
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="page-dots">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`page-number ${currentPage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className="page-arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
}