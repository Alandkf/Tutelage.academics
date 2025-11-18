"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "../ThemeToggle"
import { useAuth } from "../AuthContext"
import BASE_URL from "@/app/config/url"

export default function Header() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Fetch pending approvals
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/approvals?status=PENDING`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.approvals || [])
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchNotifications()
      // Refresh every 30 seconds
      const interval = setInterval(fetchNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  const getActionIcon = (action) => {
    switch (action) {
      case 'CREATE': return <Plus className="h-4 w-4" />
      case 'UPDATE': return <Edit className="h-4 w-4" />
      case 'DELETE': return <Trash2 className="h-4 w-4" />
      default: return <Eye className="h-4 w-4" />
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'CREATE': return '#10b981' // emerald-500
      case 'UPDATE': return '#3b82f6' // blue-500
      case 'DELETE': return '#ef4444' // red-500
      default: return '#6b7280' // gray-500
    }
  }

  const getNotificationTitle = (approval) => {
    if (approval.payload?.title) return approval.payload.title
    if (approval.enhancedPayload?.changes?.title) return approval.enhancedPayload.changes.title
    return `${approval.resourceType} ${approval.resourceId || 'New'}`
  }

  const handleNotificationClick = (approvalId) => {
    setIsOpen(false)
    // Navigate to approvals page and scroll to the specific approval
    window.location.href = `/admin-dashboard/approvals#approval-${approvalId}`
  }
  return (
    <header className="sticky top-0 z-30 w-full h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center">
      <div className="container flex items-center justify-between h-full px-2 md:px-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold ml-10 md:ml-0">Admin</h2>
        </div>        
        <div className="flex items-center gap-1">
          {user?.role === 'ADMIN' && (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notifications.length > 99 ? '99+' : notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Approval Requests</h3>
                  <p className="text-sm text-muted-foreground">
                    {notifications.length} pending request{notifications.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No pending requests
                    </div>
                  ) : (
                    <div className="p-2 space-y-2">
                      {notifications.slice(0, 5).map((notification) => (
                        <Card 
                          key={notification.id} 
                          className="cursor-pointer overflow-hidden border-l-4 transition-all duration-200 hover:shadow-md py-2"
                          style={{ borderLeftColor: getActionColor(notification.action) }}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <CardContent className="p-2">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                {getActionIcon(notification.action)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium uppercase tracking-wide">
                                    {notification.action}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {notification.resourceType}
                                  </span>
                                </div>
                                <p className="text-sm font-medium truncate">
                                  {getNotificationTitle(notification)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(notification.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t">
                    <Link href="/admin-dashboard/approvals">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Show All Requests
                      </Button>
                    </Link>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeToggle />
          <Link href="/">
            <Button variant={"secondary"} size="sm">
                Back to Main Page
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

