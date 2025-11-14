"use client"

import { useState, useEffect } from "react"
import { Headphones, Mic, BookOpen, PenTool, FileText, Book, Video, Music } from "lucide-react"
import StatsCard from "./StatsCard"
import StatsCardSkeleton from "../../skeletons/StatsCardSkeleton"

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true)
  const [stats] = useState([
    {
      title: "Listenings",
      count: 24,
      icon: Headphones,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100"
    },
    {
      title: "Speaking",
      count: 18,
      icon: Mic,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    },
    {
      title: "Reading",
      count: 32,
      icon: BookOpen,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100"
    },
    {
      title: "Writing",
      count: 15,
      icon: PenTool,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-100"
    },
    {
      title: "Blogs",
      count: 42,
      icon: FileText,
      iconColor: "text-pink-600",
      iconBgColor: "bg-pink-100"
    },
    {
      title: "Stories",
      count: 28,
      icon: Book,
      iconColor: "text-indigo-600",
      iconBgColor: "bg-indigo-100"
    },
    {
      title: "Videos",
      count: 36,
      icon: Video,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-100"
    },
    {
      title: "Audios",
      count: 21,
      icon: Music,
      iconColor: "text-teal-600",
      iconBgColor: "bg-teal-100"
    }
  ])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
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
          stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              count={stat.count}
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
