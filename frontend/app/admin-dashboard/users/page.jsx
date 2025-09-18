"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import UserTable from "@/components/admin/user/UserTable"
import CreateUserForm from "@/components/forms/CreateUserForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import BASE_URL from "@/app/config/url"

export default function Page() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteUser, setDeleteUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  // Fetch current user (for role)
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch(`${BASE_URL}/auth/me`, { credentials: "include" })
        const data = await res.json()        
        if (data.success) setCurrentUser(data.user)
      } catch {}
    }
    fetchCurrentUser()
  }, [])

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/users`, { credentials: "include" })
      const data = await res.json()
      console.log('Fetched users data:', data.users);
      
      if (data.success) setUsers(data.users)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchUsers() }, [])

  // Handlers
  const handleCreateSuccess = () => {
    setShowCreate(false)
    fetchUsers()
  }
  const handleEdit = (user) => {
    setEditUser(user)
    setShowEdit(true)
  }
  const handleEditSuccess = () => {
    setShowEdit(false)
    setEditUser(null)
    fetchUsers()
  }
  const handleDelete = (user) => {
    setDeleteUser(user)
    setShowDelete(true)
  }
  const confirmDelete = async () => {
    if (!deleteUser) return
    setLoading(true)
    try {
      await fetch(`${BASE_URL}/users/${deleteUser.id}`, {
        method: "DELETE",
        credentials: "include"
      })
      setShowDelete(false)
      setDeleteUser(null)
      fetchUsers()
    } finally {
      setLoading(false)
    }
  }
  const handleToggleActive = async (user, activate) => {
    setLoading(true)
    try {
      const url = `${BASE_URL}/users/${user.id}/${activate ? "activate" : "deactivate"}`
      await fetch(url, {
        method: "POST",
        credentials: "include"
      })
      fetchUsers()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        {currentUser?.role === "ADMIN" && (
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="h-5 w-5" />
            Create User
          </Button>
        )}
      </div>
      <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading users...</div>
        ) : (
          <UserTable
            users={users}
            currentUserRole={currentUser?.role}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />
        )}
      </div>
      <div className="mt-2 text-sm text-muted-foreground text-left">
        Total users: <span className="font-semibold text-foreground">{users.length}</span>
      </div>
      {/* Create User Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>
          <CreateUserForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>
      {/* Edit User Dialog */}
      <Dialog open={showEdit} onOpenChange={(v) => { setShowEdit(v); if (!v) setEditUser(null) }}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <CreateUserForm
            mode="edit"
            initialValues={editUser}
            onSuccess={handleEditSuccess}
            onCancel={() => { setShowEdit(false); setEditUser(null) }}
          />
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={(v) => { if (!loading) setShowDelete(v) }}>
        <DialogContent className="max-w-sm w-full">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-sm">
            Are you sure you want to delete <span className="font-semibold text-foreground">{deleteUser?.name}</span>?
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)} disabled={loading}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}