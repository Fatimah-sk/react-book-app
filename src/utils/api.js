const BASE_URL = "https://gutendex.com/books";

export async function fetchBooks(url = BASE_URL) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch books.");
  }

  return response.json();
}

export function buildHomeUrl(search = "", topic = "") {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (topic.trim()) {
    params.set("topic", topic.trim().toLowerCase());
  }

  const queryString = params.toString();
  return queryString ? `${BASE_URL}?${queryString}` : BASE_URL;
}

export function buildBookDetailsUrl(id) {
  return `${BASE_URL}?ids=${id}`;
}

export function getPreferredReadUrl(book) {
  if (!book?.formats) return null;

  return (
    book.formats["text/plain; charset=us-ascii"] ||
    book.formats["text/plain; charset=utf-8"] ||
    book.formats["text/plain"] ||
    book.formats["text/html"] ||
    book.formats["application/epub+zip"] ||
    null
  );
}