'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, TrendingUp, Users, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'

const AnalyticsChart = () => {
  const [stats, setStats] = useState(null)
  const [dailyData, setDailyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const [statsRes, dailyRes] = await Promise.all([
          fetch(`${BASE_URL}/api/website-analytics/website-stats`),
          fetch(`${BASE_URL}/api/website-analytics/daily-stats?days=7`)
        ])

        if (!statsRes.ok || !dailyRes.ok) {
          throw new Error('Failed to fetch analytics')
        }

        const statsData = await statsRes.json()
        const dailyDataRes = await dailyRes.json()

        setStats(statsData.data)
        setDailyData(dailyDataRes.data || [])
      } catch (err) {
        console.error('Error fetching analytics:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <Card className="min-h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading analytics...</p>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Unable to load analytics</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </Card>
    )
  }

  const maxViews = Math.max(...dailyData.map(d => d.views), 1)

  return (
    <Card className="min-h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Website Analytics
        </CardTitle>
        <CardDescription>
          Track your website traffic and visitor engagement
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">Total Views</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {stats?.totalViews?.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Last 365 days</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Active Users</span>
            </div>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
              {stats?.todayActive?.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">Today</p>
          </div>
        </div>

        {/* Simple Chart Visualization */}
        <div className="flex-1 flex flex-col justify-end mb-6">
          <p className="text-sm font-medium mb-3 text-muted-foreground">Last 7 Days Activity</p>
          <div className="flex items-end justify-between gap-2 h-32">
            {dailyData.length > 0 ? (
              dailyData.map((data, idx) => {
                const height = (data.views / maxViews) * 100
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all hover:from-primary/80 hover:to-primary/40"
                      style={{ height: `${height}%` }}
                      title={`${data.views} views`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {data.day}
                    </span>
                  </div>
                )
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                No data available yet
              </div>
            )}
          </div>
        </div>

        {/* Insights */}
        {stats?.weeklyGrowth !== undefined && (
          <div className="bg-muted/50 rounded-lg p-3 mb-4 border">
            <div className="flex items-start gap-2">
              <TrendingUp className={`h-4 w-4 mt-0.5 ${
                stats.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`} />
              <div>
                <p className="text-sm font-medium">
                  {stats.weeklyGrowth >= 0 ? 'Growing Steadily' : 'Trending Down'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.weeklyGrowth >= 0 ? '+' : ''}{stats.weeklyGrowth}% change in visitors compared to last month
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View More Button */}
        <Link href="/admin-dashboard/analytics" className="w-full">
          <Button className="w-full" variant="outline">
            View Detailed Analytics
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default AnalyticsChart
