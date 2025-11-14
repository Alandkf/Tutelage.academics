"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const StatsCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardContent className="">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-12 md:h-6 md:w-16" />
          </div>
          <Skeleton className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCardSkeleton
