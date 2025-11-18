"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Clock, User, FileText } from "lucide-react"
import BASE_URL from "@/app/config/url"

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [actionLoading, setActionLoading] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null) // { id, action: 'approve' | 'reject' }

  // Fetch approvals
  const fetchApprovals = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/approvals?status=PENDING`, { credentials: "include" })
      const data = await res.json()

      if (data.success) {
        setApprovals(data.approvals)
      } else {
        toast.error(data.message || "Failed to fetch approvals")
      }
    } catch (error) {
      console.error("Error fetching approvals:", error)
      toast.error("Failed to fetch approvals")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApprovals()
  }, [])

  // Handle approve/reject
  const handleAction = async (id, action) => {
    setActionLoading(id)
    try {
      const endpoint = action === 'approve' ? 'approve' : 'reject'
      const res = await fetch(`${BASE_URL}/api/approvals/${id}/${endpoint}`, {
        method: 'POST',
        credentials: "include"
      })
      const data = await res.json()

      if (data.success) {
        toast.success(`Request ${action}d successfully`)
        setApprovals(prev => prev.filter(approval => approval.id !== id))
        setExpandedId(null)
      } else {
        toast.error(data.message || `Failed to ${action} request`)
      }
    } catch (error) {
      console.error(`Error ${action}ing request:`, error)
      toast.error(`Failed to ${action} request`)
    } finally {
      setActionLoading(null)
      setConfirmAction(null)
    }
  }

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'CREATE': return '➕'
      case 'UPDATE': return '✏️'
      case 'DELETE': return '🗑️'
      default: return '📝'
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'CREATE': return 'text-green-600'
      case 'UPDATE': return 'text-blue-600'
      case 'DELETE': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Approval Requests</h1>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Approval Requests</h1>
        <Badge variant="secondary" className="text-sm">
          {approvals.length} pending
        </Badge>
      </div>

      {approvals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
            <p className="text-muted-foreground text-center">
              No pending approval requests at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {approvals.map((approval) => (
            <Card key={approval.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getActionIcon(approval.action)}</span>
                      <CardTitle className="text-lg">
                        {approval.action} {approval.resourceType}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {approval.requester?.name || 'Unknown'}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        ID: {approval.resourceId || 'New'}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(approval.id)}
                    className="ml-4"
                  >
                    {expandedId === approval.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {expandedId === approval.id && (
                <CardContent className="pt-0">
                  <div className="border-t pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Changes Requested:</h4>
                      <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(approval.payload, null, 2)}
                      </pre>
                    </div>

                    {approval.reason && (
                      <div>
                        <h4 className="font-semibold mb-2">Reason:</h4>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                          {approval.reason}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => setConfirmAction({ id: approval.id, action: 'approve' })}
                        disabled={actionLoading === approval.id}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {actionLoading === approval.id ? 'Processing...' : 'Approve'}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => setConfirmAction({ id: approval.id, action: 'reject' })}
                        disabled={actionLoading === approval.id}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        {actionLoading === approval.id ? 'Processing...' : 'Reject'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction?.action === 'approve' ? 'Approve Request' : 'Reject Request'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {confirmAction?.action} this {approvals.find(a => a.id === confirmAction?.id)?.resourceType.toLowerCase()} {confirmAction?.action === 'approve' ? 'update' : 'rejection'}?
              {confirmAction?.action === 'reject' && ' This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmAction && handleAction(confirmAction.id, confirmAction.action)}
              className={confirmAction?.action === 'reject' ? 'bg-destructive hover:bg-destructive/90' : ''}
            >
              {confirmAction?.action === 'approve' ? 'Approve' : 'Reject'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}