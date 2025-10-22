"use client";
import { useEffect, useState } from "react";
import BASE_URL from "../config/url";

export default function ApiDemoPage() {
  const API_BASE = BASE_URL || "http://localhost:3001";

  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [blogsRes, videosRes] = await Promise.all([
          fetch(`${API_BASE}/api/blogs/paginated?page=1&limit=10`, {
            credentials: "include",
          }),
          fetch(`${API_BASE}/api/videos/paginated?page=1&limit=10`, {
            credentials: "include",
          }),
        ]);

        if (!blogsRes.ok) throw new Error(`Blogs request failed: ${blogsRes.status}`);
        if (!videosRes.ok) throw new Error(`Videos request failed: ${videosRes.status}`);

        const blogsJson = await blogsRes.json();
        const videosJson = await videosRes.json();

        setBlogs(blogsJson?.data?.blogs ?? []);
        setVideos(videosJson?.data?.videos ?? []);
      } catch (err) {
        setError(err?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_BASE]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">API Demo: Blogs & Videos</h1>
      <p className="text-sm text-gray-600 mb-6">Fetching from: <span className="font-mono">{API_BASE}</span></p>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">Blogs</h2>
            {blogs.length === 0 ? (
              <p className="text-gray-500">No blogs found.</p>
            ) : (
              <ul className="space-y-2">
                {blogs.map((b) => (
                  <li key={b.id} className="border rounded p-3">
                    <div className="font-medium">{b.title}</div>
                    {b.category && <div className="text-sm text-gray-600">{b.category}</div>}
                    {b.author && (
                      <div className="text-xs text-gray-500">By: {b.author.name}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Videos</h2>
            {videos.length === 0 ? (
              <p className="text-gray-500">No videos found.</p>
            ) : (
              <ul className="space-y-2">
                {videos.map((v) => (
                  <li key={v.id} className="border rounded p-3">
                    <div className="font-medium">{v.title}</div>
                    {v.description && (
                      <div className="text-sm text-gray-600">{v.description}</div>
                    )}
                    {v.author && (
                      <div className="text-xs text-gray-500">By: {v.author.name}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}