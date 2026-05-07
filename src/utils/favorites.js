const FAVORITES_KEY = "openlibrary_favorites";

function getBookId(book) {
  return book.key || book.id;
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(bookId) {
  return getFavorites().some((item) => getBookId(item) === bookId);
}

export function addFavorite(book) {
  const favorites = getFavorites();
  const bookId = getBookId(book);

  const exists = favorites.some((item) => getBookId(item) === bookId);

  if (!exists) {
    saveFavorites([...favorites, book]);
  }
}

export function removeFavorite(bookId) {
  const favorites = getFavorites();
  const updated = favorites.filter((item) => getBookId(item) !== bookId);
  saveFavorites(updated);
}