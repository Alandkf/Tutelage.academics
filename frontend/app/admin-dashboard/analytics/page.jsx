'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Globe,
  Monitor,
  Smartphone,
  ArrowLeft,
  Download,
  Calendar,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null)
  const [dailyData, setDailyData] = useState([])
  const [topPages, setTopPages] = useState([])
  const [deviceStats, setDeviceStats] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllAnalytics = async () => {
      try {
        setLoading(true)
        const [statsRes, dailyRes, pagesRes, devicesRes, countriesRes] = await Promise.all([
          fetch(`${BASE_URL}/api/website-analytics/website-stats`),
          fetch(`${BASE_URL}/api/website-analytics/daily-stats?days=7`),
          fetch(`${BASE_URL}/api/website-analytics/top-pages?limit=5`),
          fetch(`${BASE_URL}/api/website-analytics/device-stats`),
          fetch(`${BASE_URL}/api/website-analytics/country-stats?limit=5`)
        ])

        if (!statsRes.ok) throw new Error('Failed to fetch stats')

        const [statsData, dailyDataRes, pagesData, devicesData, countriesData] = await Promise.all([
          statsRes.json(),
          dailyRes.json(),
          pagesRes.json(),
          devicesRes.json(),
          countriesRes.json()
        ])

        setStats(statsData.data)
        setDailyData(dailyDataRes.data || [])
        setTopPages(pagesData.data || [])
        setDeviceStats(devicesData.data || [])
        setCountries(countriesData.data || [])
      } catch (err) {
        console.error('Error fetching analytics:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAllAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading analytics dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 max-w-md">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Unable to load analytics</p>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Link href="/admin-dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  const maxValue = Math.max(...dailyData.map(d => Math.max(d.views, d.users)), 1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin-dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive website traffic and visitor insights
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalViews?.toLocaleString() || '0'}</div>
            <p className="text-xs text-muted-foreground">Last 365 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.uniqueVisitors?.toLocaleString() || '0'}</div>
            <p className={`text-xs flex items-center gap-1 ${
              (stats?.weeklyGrowth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="h-3 w-3" />
              {(stats?.weeklyGrowth || 0) >= 0 ? '+' : ''}{stats?.weeklyGrowth || 0}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.avgSessionDuration || '0m 0s'}</div>
            <p className="text-xs text-muted-foreground">Time spent per visit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.todayActive?.toLocaleString() || '0'}</div>
            <p className="text-xs text-muted-foreground">Currently browsing</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily page views and unique visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chart */}
              <div className="flex items-end justify-between gap-3 h-64">
                {dailyData.length > 0 ? (
                  dailyData.map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full flex gap-1 items-end" style={{ height: '85%' }}>
                        {/* Views bar */}
                        <div 
                          className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-md hover:from-primary/80 transition-all"
                          style={{ height: `${(data.views / maxValue) * 100}%` }}
                          title={`${data.views} views`}
                        />
                        {/* Users bar */}
                        <div 
                          className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-md hover:from-green-600 transition-all"
                          style={{ height: `${(data.users / maxValue) * 100}%` }}
                          title={`${data.users} users`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {data.day}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">No data available yet</p>
                  </div>
                )}
              </div>
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-sm text-muted-foreground">Page Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span className="text-sm text-muted-foreground">Unique Visitors</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate flex-1" title={page.page}>
                      {page.page}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {page.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device & Geography */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Devices
            </CardTitle>
            <CardDescription>Traffic by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceStats.map((device, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    {device.device === 'Mobile' ? (
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-secondary rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16 text-right">
                      {device.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Top Countries
            </CardTitle>
            <CardDescription>Visitors by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countries.map((country, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-sm font-medium">{country.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {country.users.toLocaleString()} users
                  </span>
                </div>
              ))}
            </div>
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
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Connected to Google Analytics
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {stats?.totalViews > 0 ? (
                  <>
                    This dashboard is displaying real-time data from Google Analytics. 
                    Data is fetched directly from your Google Analytics property and updates automatically.
                  </>
                ) : (
                  <>
                    Google Analytics is configured but hasn't collected data yet. 
                    It typically takes 24-48 hours to start showing visitor data after initial setup. 
                    Keep the site running and check back soon!
                  </>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsPage
