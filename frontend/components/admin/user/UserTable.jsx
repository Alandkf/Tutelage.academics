import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import Image from "next/image"

export default function UserTable({ users, currentUserRole, onEdit, onDelete, onToggleActive }) {
  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow className={"hover:bg-white transition-colors"}>
            <TableHead className="w-8 text-xs">#</TableHead>
            <TableHead className="text-xs">Name</TableHead>
            <TableHead className="text-xs">Email</TableHead>
            <TableHead className="text-xs">Role</TableHead>
            <TableHead className="text-xs">Status</TableHead>
            <TableHead className="text-xs">Created</TableHead>
            <TableHead className="text-xs text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow key={user.id} className="hover:bg-accent/10 transition-colors">
              <TableCell className="py-2 text-xs">{idx + 1}</TableCell>
              <TableCell className="py-2 flex items-center gap-2 text-xs">
                {user.image && (
                  <Image src={user.image} alt={user.name} width={24} height={24} className="rounded-full object-cover" />
                )}
                <span>{user.name}</span>
              </TableCell>
              <TableCell className="py-2 text-xs">{user.email}</TableCell>
              <TableCell className="py-2 text-xs">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === "ADMIN" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="py-2 text-xs">
                {user.isActive ? (
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">Active</span>
                ) : (
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">Inactive</span>
                )}
              </TableCell>
              <TableCell className="py-2 text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="py-2 text-xs text-center">
                {currentUserRole === "ADMIN" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="rounded-full" aria-label="Edit user">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[140px]">
                      <DropdownMenuItem onClick={() => onEdit(user)}>Edit</DropdownMenuItem>
                      {user.isActive ? (
                        <DropdownMenuItem onClick={() => onToggleActive(user, false)} className="text-yellow-700">Deactivate</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onToggleActive(user, true)} className="text-green-700">Activate</DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onDelete(user)} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <span className="text-xs text-muted-foreground">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
