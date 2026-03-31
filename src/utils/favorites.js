const FAVORITES_KEY = "gutendex_favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(bookId) {
  return getFavorites().some((item) => item.id === bookId);
}

export function addFavorite(book) {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === book.id);

  if (!exists) {
    saveFavorites([...favorites, book]);
  }
}

export function removeFavorite(bookId) {
  const favorites = getFavorites();
  saveFavorites(favorites.filter((item) => item.id !== bookId));
}