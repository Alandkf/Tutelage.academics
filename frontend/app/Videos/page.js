'use client';

// Import necessary components and hooks
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchData } from "@/lib/api";

export default function SecondPage() {
  // State to store data from the API
  const [data, setData] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData("/second");
      setData(result);
    };
    
    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 py-8">
        <h1 className="text-4xl font-bold mb-6">Videos</h1>
        <p className="text-lg mb-4">Backend says: {data?.message || 'Loading...'}</p>
      </div>
      <Footer />
    </div>
  );
}
