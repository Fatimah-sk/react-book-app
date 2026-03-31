export function splitTextIntoPages(text, chunkSize = 3500) {
  if (!text) return [];

  const cleanText = text
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!cleanText) return [];

  const paragraphs = cleanText.split("\n\n");
  const pages = [];
  let currentPage = "";

  for (const paragraph of paragraphs) {
    if ((currentPage + "\n\n" + paragraph).length > chunkSize) {
      if (currentPage.trim()) {
        pages.push(currentPage.trim());
      }
      currentPage = paragraph;
    } else {
      currentPage += (currentPage ? "\n\n" : "") + paragraph;
    }
  }

  if (currentPage.trim()) {
    pages.push(currentPage.trim());
  }

  return pages;
}