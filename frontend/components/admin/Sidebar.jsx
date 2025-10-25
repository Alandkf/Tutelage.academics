"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Users, ShoppingBag, MonitorCog, Menu, X, Newspaper, Video, FileVolume, FileQuestion, CircleQuestionMark } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminProfileSection from "@/components/admin/AdminProfileSection"
import { useAuth } from "@/components/AuthContext"

const menuItems = [
  { icon: Home, name: "Dashboard", href: "/admin-dashboard" },
  { icon: Users, name: "Users", href: "/admin-dashboard/users" },
  { icon: Newspaper, name: "Blogs", href: "/admin-dashboard/blogs" },
  { icon: Video, name: "Videos", href: "/admin-dashboard/videos" },
  { icon: FileVolume, name: "Audios", href: "/admin-dashboard/audios" },
  { icon: CircleQuestionMark, name: "Faqs", href: "/admin-dashboard/faqs" },
  { icon: MonitorCog, name: "Landing", href: "/admin-dashboard/landing" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, loading } = useAuth()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between p-2">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          {/* Profile */}
          <div className="flex items-center gap-2">
            <AdminProfileSection />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border">
        <div className="h-14 border-b border-border flex items-center px-4">
          <span className="font-semibold">Admin Menu</span>
        </div>
        <nav className="p-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center px-3 py-2 my-1 rounded-md ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-2 border-t border-border">
          <AdminProfileSection />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-background border-r border-border z-50"
            >
              <div className="flex items-center justify-between p-2 border-b border-border">
                <span className="font-semibold">Admin Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="p-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name} 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`flex items-center px-3 py-2 my-1 rounded-md ${
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* ADMIN Profile Section (desktop & mobile) */}
              <AdminProfileSection session={user ? { user } : null} loading={loading} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

