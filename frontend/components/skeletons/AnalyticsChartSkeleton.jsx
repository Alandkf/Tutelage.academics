import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart } from "lucide-react";

const AnalyticsChartSkeleton = () => (
  <Card className="min-h-[500px] flex flex-col animate-pulse">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart className="h-5 w-5 text-muted-foreground" />
        <span>Website Analytics</span>
      </CardTitle>
      <CardDescription>
        <Skeleton className="h-4 w-40 mt-2" />
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
      </div>
      {/* Chart Skeleton */}
      <div className="flex-1 flex flex-col justify-start mb-6">
        <Skeleton className="h-4 w-32 mb-3" />
        <div className="flex items-start gap-1 h-32">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex-none flex flex-col items-center h-full justify-start" style={{ width: `${100 / 7}%` }}>
              <Skeleton className="w-[80%] h-28 rounded-md" />
              <Skeleton className="h-3 w-8 mt-1" />
            </div>
          ))}
        </div>
      </div>
      {/* Insights Skeleton */}
      <Skeleton className="h-10 w-full mb-4 rounded-lg" />
      {/* Button Skeleton */}
      <Skeleton className="h-10 w-full rounded" />
    </CardContent>
  </Card>
);

export default AnalyticsChartSkeleton;
