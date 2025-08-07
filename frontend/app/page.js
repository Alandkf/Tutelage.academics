'use client';  // 👈 Add this line at the top

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <main>
      <h1>Welcome to Tutelage</h1>
      <p>Backend says: {data?.message || 'Loading...'}</p>
    </main>
  );
}
