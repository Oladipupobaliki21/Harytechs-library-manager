/**
 * Open Library API Service
 * Docs: https://openlibrary.org/developers/api
 *
 * ✅ FREE — No API key required.
 * If you ever want richer data (or higher rate limits), you can also use
 * Google Books API: https://developers.google.com/books/docs/v1/reference/volumes/list
 * → Replace GOOGLE_BOOKS_API_KEY below and switch the functions to use that endpoint.
 */

const OL_BASE = "https://openlibrary.org";
const COVER_BASE = "https://covers.openlibrary.org/b/id";

// Fields requested from the Search API (keeps response small & fast)
const FIELDS =
  "key,title,author_name,cover_i,subject,first_publish_year,number_of_pages_median,ratings_average,ratings_count,edition_count";

/** Convert a raw Open Library doc to a clean book object */
function normalizeSearchDoc(doc) {
  const id = doc.key ? doc.key.replace("/works/", "") : String(doc.cover_i || Math.random());
  return {
    id,
    olKey: doc.key || null,
    title: doc.title || "Unknown Title",
    author: doc.author_name?.[0] || "Unknown Author",
    image: doc.cover_i
      ? `${COVER_BASE}/${doc.cover_i}-M.jpg`
      : null,
    year: doc.first_publish_year || null,
    category: doc.subject?.[0] || "General",
    pages: doc.number_of_pages_median || null,
    rating: doc.ratings_average
      ? Math.round(doc.ratings_average * 10) / 10
      : null,
    ratingsCount: doc.ratings_count || 0,
    editions: doc.edition_count || 1,
  };
}

/** Convert a raw Open Library trending/subject work to a clean book object */
function normalizeWork(work) {
  const id = work.key ? work.key.replace("/works/", "") : String(work.cover_id);
  return {
    id,
    olKey: work.key || null,
    title: work.title || "Unknown Title",
    author:
      work.author_name?.[0] ||
      work.authors?.[0]?.name ||
      "Unknown Author",
    image: work.cover_id
      ? `${COVER_BASE}/${work.cover_id}-M.jpg`
      : work.cover_i
      ? `${COVER_BASE}/${work.cover_i}-M.jpg`
      : null,
    year: work.first_publish_year || null,
    category: work.subject?.[0] || "General",
    pages: work.number_of_pages_median || null,
    rating: work.ratings_average
      ? Math.round(work.ratings_average * 10) / 10
      : null,
    ratingsCount: work.ratings_count || 0,
    editions: work.edition_count || 1,
  };
}

/**
 * Search for books by any query (title, author, ISBN, subject…)
 * @param {string} query
 * @param {object} opts - { limit?, page? }
 * @returns {{ books: Book[], total: number, page: number, totalPages: number }}
 */
export async function searchBooks(query, { limit = 16, page = 1 } = {}) {
  const offset = (page - 1) * limit;
  const url = `${OL_BASE}/search.json?q=${encodeURIComponent(query)}&fields=${FIELDS}&limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Search API error: ${res.status}`);
  const data = await res.json();
  return {
    books: data.docs.map(normalizeSearchDoc),
    total: data.numFound || 0,
    page,
    limit,
    totalPages: Math.ceil((data.numFound || 0) / limit),
  };
}

/**
 * Fetch trending books of the day from Open Library
 * @returns {Book[]}
 */
export async function getTrendingBooks(limit = 16) {
  const url = `${OL_BASE}/trending/daily.json?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Trending API error: ${res.status}`);
  const data = await res.json();
  return (data.works || []).map(normalizeWork);
}

/**
 * Fetch books by subject/genre
 * @param {string} subject - e.g. "self_help", "fiction", "productivity"
 * @returns {Book[]}
 */
export async function getBooksBySubject(subject, limit = 16) {
  const slug = subject.toLowerCase().replace(/\s+/g, "_");
  const url = `${OL_BASE}/subjects/${encodeURIComponent(slug)}.json?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Subject API error: ${res.status}`);
  const data = await res.json();
  return (data.works || []).map(normalizeWork);
}
