const StoryCardSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-md animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 w-full bg-muted"></div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-6 bg-muted rounded mb-7 pb-2 w-3/4"></div>

        {/* Description Skeleton - 3 lines */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
      </div>
    </div>
  )
}

export default StoryCardSkeleton
