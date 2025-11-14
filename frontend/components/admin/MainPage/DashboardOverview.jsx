"use client"

import { useState, useEffect } from "react"
import { Headphones, Mic, BookOpen, PenTool, FileText, Book, Video, Music } from "lucide-react"
import StatsCard from "./StatsCard"
import BASE_URL from "@/app/config/url"
import StatsCardSkeleton from "../../skeletons/StatsCardSkeleton"

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    listenings: 0,
    speakings: 0,
    readings: 0,
    writings: 0,
    blogs: 0,
    stories: 0,
    videos: 0,
    audios: 0
  })

  const statsConfig = [
    {
      key: 'listenings',
      title: "Listenings",
      icon: Headphones,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100"
    },
    {
      key: 'speakings',
      title: "Speaking",
      icon: Mic,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    },
    {
      key: 'readings',
      title: "Reading",
      icon: BookOpen,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100"
    },
    {
      key: 'writings',
      title: "Writing",
      icon: PenTool,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100"
    },
    {
      key: 'blogs',
      title: "Blogs",
      icon: FileText,
      iconColor: "text-pink-600",
      iconBgColor: "bg-pink-100"
    },
    {
      key: 'stories',
      title: "Stories",
      icon: Book,
      iconColor: "text-indigo-600",
      iconBgColor: "bg-indigo-100"
    },
    {
      key: 'videos',
      title: "Videos",
      icon: Video,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-100"
    },
    {
      key: 'audios',
      title: "Audios",
      icon: Music,
      iconColor: "text-teal-600",
      iconBgColor: "bg-teal-100"
    }
  ]

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/api/stats`, {
          credentials: 'include'
        })
        const data = await res.json()
        
        if (data.success) {
          setStats(data.data)
        } else {
          console.error('Failed to fetch stats:', data.message)
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {loading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <StatsCardSkeleton key={index} />
            ))}
          </>
        ) : (
          statsConfig.map((stat) => (
            <StatsCard
              key={stat.key}
              title={stat.title}
              count={stats[stat.key] || 0}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBgColor={stat.iconBgColor}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default DashboardOverview
