'use client';

import { useState, useEffect } from 'react';
import { Play, Clock, Eye, AlertCircle, Loader2 } from 'lucide-react';

// Import your actual components and API function
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchData } from "@/lib/api";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        console.log('Fetching videos from API...');
        const result = await fetchData("/videos");
        console.log('API response:', result);
        
        if (result.error) {
          console.error('Error from API:', result.error);
          setError(result.error);
        } else if (result.success && result.data) {
          console.log('Videos data received:', result.data);
          setVideos(result.data);
        } else {
          console.warn('No success or data property in response:', result);
          setError("No videos found or invalid response format");
        }
      } catch (err) {
        console.error('Exception during fetch:', err);
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };
    
    getVideos();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-48"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded-full w-20 mb-3"></div>
            <div className="h-6 bg-gray-300 rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Educational Videos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover a curated collection of educational content designed to expand your knowledge and inspire learning
          </p>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-3 text-blue-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg font-medium">Loading amazing content...</span>
            </div>
            <LoadingSkeleton />
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && !error && videos.length === 0 && (
          <div className="max-w-md mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
              <Play className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-amber-800 mb-2">No Videos Available</h3>
              <p className="text-amber-600">Check back soon for new educational content!</p>
            </div>
          </div>
        )}
        
        {/* Videos Grid */}
        {!loading && !error && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                {/* Video Container - Use iframe for actual video URLs */}
                <div className="relative overflow-hidden">
                  <div className="relative pb-[56.25%]">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    
                    {/* Overlay for hover effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    {/* Duration Badge */}
                    {video.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-3">
                    {video.category}
                  </span>
                  
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {video.title}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {video.description}
                  </p>
                  
                  {/* Stats */}
                  {video.views && (
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views} views</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}