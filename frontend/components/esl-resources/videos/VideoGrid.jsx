'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import BASE_URL from '@/app/config/url'
import StoryCardSkeleton from '@/components/skeletons/StoryCardSkeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'Science', label: 'Science' },
  { value: 'Math', label: 'Math' },
  { value: 'Conversation', label: 'Conversation' },
  { value: 'Grammar', label: 'Grammar' },
  { value: 'Vocabulary', label: 'Vocabulary' },
  { value: 'Business', label: 'Business' },
  { value: 'Culture', label: 'Culture' }
]

const getYouTubeThumbnail = (url, preferMax = false) => {
  if (!url) return null;
  try {
    // match common YouTube URL forms: v=ID, youtu.be/ID, embed/ID
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{6,})/);
    const id = match && match[1];
    if (!id) return null;
    // prefer max resolution when available (may 404 for some videos)
    return preferMax
      ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  } catch (e) {
    return null;
  }
};

const VideoGrid = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPrevPage, setHasPrevPage] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const itemsPerPage = 6

  const fetchVideos = useCallback(async (page, search = '', category = 'all') => {
    setLoading(true)
    try {
      let url = `${BASE_URL}/api/esl-videos?page=${page}&limit=${itemsPerPage}`
      
      if (search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`
      }
      
      if (category !== 'all') {
        url += `&category=${encodeURIComponent(category)}`
      }
      
      const response = await fetch(url, { credentials: 'include' })
      const data = await response.json()

      if (data.success) {
        setVideos(data.data)
        setTotalPages(data.pagination.totalPages)
        setHasNextPage(data.pagination.hasNextPage)
        setHasPrevPage(data.pagination.hasPrevPage)
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }, [itemsPerPage])

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput)
      setCurrentPage(1) // Reset to page 1 on new search
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [searchInput])

  // Category change effect
  useEffect(() => {
    setCurrentPage(1) // Reset to page 1 on category change
  }, [selectedCategory])

  // Fetch videos when page, search, or category changes
  useEffect(() => {
    fetchVideos(currentPage, searchQuery, selectedCategory)
  }, [currentPage, searchQuery, selectedCategory, fetchVideos])

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const truncateText = (text, maxLength = 120) => {
    if (!text) return ''
    if (text?.length <= maxLength) return text
    return text?.slice(0, maxLength) + '...'
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    
    // Show previous page if exists
    if (currentPage > 1) {
      pages.push(currentPage - 1)
    }
    
    // Always show current page
    pages.push(currentPage)
    
    // Show next page if exists
    if (currentPage + 1 <= totalPages) {
      pages.push(currentPage + 1)
    }
    
    // Check if we can show a page +10 ahead OR the last page if less than +10
    const pagePlusTen = currentPage + 10
    
    if (pagePlusTen <= totalPages) {
      // We can show page +10
      pages.push('...')
      pages.push(pagePlusTen)
    } else if (totalPages > currentPage + 1) {
      // Can't show +10, but show the last page if it's beyond current+1
      pages.push('...')
      pages.push(totalPages)
    }
    
    return pages
  }

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      setCurrentPage(page)
    }
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 text-center">
            Our Best Videos
          </h2>
          
          {/* Search and Filter Section */}
          <div className="flex flex-row gap-4 items-start sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-3/4 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search videos by title, description, tags, or category..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 w-full py-6"
              />
            </div>

            {/* Category Filter */}
            <div className="min-w-[120px] max-w-[150px] w-1/4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Blog Grid - Show skeletons when loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {loading ? (
            // Show 6 skeleton cards
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <StoryCardSkeleton key={index} />
            ))
          ) : videos.length > 0 ? (
            // Show actual videos
            videos.map((video) => (
              <Link
                key={video.id}
                href={`/esl-resources/videos/${video.id}`}
                className="group"
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={
                        video.thumbnailUrl
                          || getYouTubeThumbnail(video.videoRef) // try building thumbnail from the YouTube URL
                          || video.imageRef
                          || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'
                      }
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title with underline and tooltip */}
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3 className="text-xl font-bold text-foreground mb-3 pb-2 truncate cursor-help">
                            {video.title}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">{video.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Description with tooltip */}
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 cursor-help">
                            {truncateText(video.description)}
                          </p>
                        </TooltipTrigger>
                        {video.description && video.description.length > 120 && (
                          <TooltipContent className="max-w-md">
                            <p className="text-sm">{video.description}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Empty State
            <div className="col-span-full text-center py-20">
              <p className="text-lg text-muted-foreground">
                No videos available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls - Always visible */}
        {(videos.length > 0 || loading) && (
          <div className="flex items-center justify-between">
            {/* Previous Button - Left */}
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevPage}
              disabled={!hasPrevPage}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            {/* Page Numbers - Center */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    disabled={page === currentPage}
                    className={`min-w-[40px] h-[40px] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground cursor-not-allowed'
                        : 'bg-background text-foreground hover:bg-muted border border-border cursor-pointer'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            {/* Next Button - Right */}
            <Button
              variant="outline"
              size="lg"
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoGrid
