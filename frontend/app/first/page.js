'use client';

import { fetchData } from "@/lib/api";

export default async function FirstPage() {
  const data = await fetchData("/my-endpoint"); // Replace with your backend endpoint

  return (
    <div>
      <h1>First Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
