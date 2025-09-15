import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AdminProfileSection({ session, loading, onLogout }) {
  if (loading) return null
  if (!session) return null

  const handleLogout = async () => {
    await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include"
    })
    if (onLogout) onLogout()
    window.location.href = "/"
  }

  return (
    <div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="Provider Logo"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                <User className="h-6 w-6" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {session.user?.name || "Admin"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session.user?.email || ""}
            </p>
          </div>
        </div>
      </div>
      {session.user?.role === "ADMIN" && (
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
