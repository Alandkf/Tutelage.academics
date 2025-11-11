'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BASE_URL from '@/app/config/url'
import StoryCardSkeleton from '@/components/skeletons/StoryCardSkeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const StoryGrid = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPrevPage, setHasPrevPage] = useState(false)

  const itemsPerPage = 6

  const fetchStories = async (page) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}/api/stories?page=${page}&limit=${itemsPerPage}`,
        { credentials: 'include' }
      )
      const data = await response.json()

      if (data.success) {
        setStories(data.data.stories)
        setTotalPages(data.data.pagination.totalPages)
        setHasNextPage(data.data.pagination.hasNextPage)
        setHasPrevPage(data.data.pagination.hasPrevPage)
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories(currentPage)
  }, [currentPage])

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
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Best Stories
          </h2>
        </div>

        {/* Story Grid - Show skeletons when loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {loading ? (
            // Show 6 skeleton cards
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <StoryCardSkeleton key={index} />
            ))
          ) : stories?.length > 0 ? (
            // Show actual stories
            stories?.map((story) => (
              <Link
                key={story.id}
                href={`/esl-resources/storys/${story.id}`}
                className="group"
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={story.imageUrl || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'}
                      alt={story.title}
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
                            {story.title}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">{story.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Description with tooltip */}
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 cursor-help">
                            {truncateText(story.description)}
                          </p>
                        </TooltipTrigger>
                        {story.description && story.description.length > 120 && (
                          <TooltipContent className="max-w-md">
                            <p className="text-sm">{story.description}</p>
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
                No stories available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls - Always visible */}
        {(stories?.length > 0 || loading) && (
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

export default StoryGrid
