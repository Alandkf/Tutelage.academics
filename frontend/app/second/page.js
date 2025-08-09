'use client';

import { fetchData } from "@/lib/api";

export default async function SecondPage() {
  const data = await fetchData("/second"); // Same backend call

  return (
    <div>
      <h1>Second Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
