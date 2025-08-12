'use client';

// Import necessary components and hooks
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  // State to store data from the API
  const [data, setData] = useState(null);

  // Fetch data from the backend when component mounts
  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 py-8">
        <h2 className="text-lg text-primary mb-2">About Us</h2>
        <h1 className="text-4xl font-bold mb-6">Welcome to Tutelage</h1>
        <p className="text-lg mb-4">Backend says: {data?.message || 'Loading...'}</p>
      </div>
      <Footer />
    </div>
  );
}
