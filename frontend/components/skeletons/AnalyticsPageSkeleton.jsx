import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Users, Eye, TrendingUp, Clock, Monitor, Globe } from "lucide-react";

const AnalyticsPageSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <Skeleton className="h-8 w-64 mb-8" />
    {/* Metrics */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-6" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
    {/* Main Charts */}
    <div className="grid gap-0 md:grid-cols-7">
      <Card className="col-span-4 gap-0 pb-0 mb-0">
        <CardHeader>
          <CardTitle><Skeleton className="h-5 w-32" /></CardTitle>
          <CardDescription className="mb-0 pb-0"><Skeleton className="h-4 w-40 pb-0 mb-0" /></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-72 mt-0 pt-0">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex gap-2 items-end" style={{ height: '90%' }}>
                  <Skeleton className="w-[80%] h-[90%] rounded-md" />
                  <Skeleton className="w-[80%] h-[76%] rounded-md" />
                </div>
                <Skeleton className="h-3 w-10 mt-1" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 pt-4 border-t mt-4">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle><Skeleton className="h-5 w-32" /></CardTitle>
          <CardDescription><Skeleton className="h-4 w-40 mt-2" /></CardDescription>
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="mb-4">
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
    {/* Device & Geography */}
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-muted-foreground" />
            <Skeleton className="h-4 w-24" />
          </CardTitle>
          <CardDescription><Skeleton className="h-4 w-32 mt-2" /></CardDescription>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 mb-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-2 w-32 rounded-full" />
              <Skeleton className="h-4 w-10" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <Skeleton className="h-4 w-24" />
          </CardTitle>
          <CardDescription><Skeleton className="h-4 w-32 mt-2" /></CardDescription>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 mb-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
    {/* Real-time Notice */}
    <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AnalyticsPageSkeleton;
