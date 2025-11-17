 

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
const API_URL = `${API_BASE}/api/search`;

function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [timeMs, setTimeMs] = useState(null);
  const controllerRef = useRef(null);

  const canSearch = useMemo(() => query.trim().length > 0, [query]);

  async function performSearch(nextPage = 1) {
    if (!canSearch) return;
    setLoading(true);
    setError(null);
    setPage(nextPage);
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();
    const started = performance.now();
    try {
      const params = new URLSearchParams({
        query,
        format: "compact",
        limit: String(limit),
        page: String(nextPage),
      });
      const res = await fetch(`${API_URL}?${params.toString()}` , { signal: controllerRef.current.signal });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      setResults(json?.results || []);
      setTotal(json?.meta?.totalResults || 0);
      const elapsed = performance.now() - started;
      setTimeMs(Math.round(elapsed));
    } catch (e) {
      if (e.name !== "AbortError") setError(e.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  return {
    state: { query, results, loading, error, page, limit, total, timeMs },
    setQuery,
    setLimit,
    performSearch,
  };
}

export default function SearchPage() {
  const { state, setQuery, setLimit, performSearch } = useSearch();
  const { query, results, loading, error, page, limit, total, timeMs } = state;

  function getHref(r) {
    // Static pages in compact mode may provide direct links as string ids
    if (typeof r.id === 'string') {
      const link = r.id.startsWith('http') ? r.id : (r.id.startsWith('/') ? r.id : `/${r.id}`);
      return link;
    }
    // Universal mode mappings
    const type = r.collectionType;
    const sub = r.subType;
    if (type === 'Blogs') return `/esl-resources/blogs/${r.id}`;
    if (type === 'Esl Resources') {
      if (sub === 'Story') return `/esl-resources/stories/${r.id}`;
      if (sub === 'EslVideo') return `/esl-resources/videos/${r.id}`;
      if (sub === 'EslAudio') return `/esl-resources/audios/${r.id}`;
    }
    // Skills and Courses currently have no public detail routes; fallback to null
    return null;
  }

  useEffect(() => {
    // Optional: prefill search from URL param
    const sp = new URLSearchParams(window.location.search);
    const q = sp.get("q") || "";
    if (q) {
      setQuery(q);
      performSearch(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Search</h1>

      <form
        className="flex gap-2 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          performSearch(1);
        }}
      >
        <label htmlFor="search-input" className="sr-only">Search text</label>
        <input
          id="search-input"
          name="q"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dynamic and static content…"
          className="w-full border rounded-md px-3 py-2"
          aria-label="Search text"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-50"
          disabled={!query.trim() || loading}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      <section aria-live="polite" className="mt-4">
        {error && (
          <div role="alert" className="text-red-600">{error}</div>
        )}
        {!loading && !error && results.length === 0 && query.trim().length > 0 && (
          <p>No results found. Try different keywords.</p>
        )}
        {loading && (
          <p>Loading…</p>
        )}
        {!loading && !error && results.length > 0 && (
          <div>
            <div className="text-sm text-gray-600 mb-2">
              Showing {results.length} of {total} results{timeMs != null ? ` • ${timeMs}ms` : ''}
            </div>
            <ul role="list" className="space-y-3">
              {results.map((r, idx) => {
                const href = getHref(r);
                const content = (
                  <div className="border rounded-md p-3 hover:bg-gray-50">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-sm text-gray-700">{r.description || r.excerpt || "No description"}</div>
                  </div>
                );
                return (
                  <li key={`${r.id}-${idx}`}>
                    {href ? (
                      <Link href={href} aria-label={`Open ${r.title}`} className="block">
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-2 mt-4">
              <button
                className="px-3 py-1 rounded border"
                onClick={() => performSearch(Math.max(page - 1, 1))}
                disabled={page <= 1 || loading}
              >Prev</button>
              <span className="text-sm">Page {page}</span>
              <button
                className="px-3 py-1 rounded border"
                onClick={() => performSearch(page + 1)}
                disabled={results.length < limit || loading}
              >Next</button>
              <select
                className="ml-auto border rounded px-2 py-1 text-sm"
                aria-label="Results per page"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                {[10, 20, 50, 100].map((n) => (
                  <option key={n} value={n}>{n} / page</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}