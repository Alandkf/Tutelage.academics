"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Clock, User, FileText, Plus, Edit, Trash2, AlertTriangle, Check, X, Loader2 } from "lucide-react"
import BASE_URL from "@/app/config/url"

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [actionLoading, setActionLoading] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null)

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

  // Handle scrolling to specific approval from notification click
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '')
      if (hash.startsWith('approval-')) {
        const element = document.getElementById(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // Add a temporary highlight effect
            element.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50')
            setTimeout(() => {
              element.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50')
            }, 3000)
          }, 500) // Wait for content to load
        }
      }
    }
  }, [approvals])

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

  const getActionConfig = (action) => {
    switch (action) {
      case 'CREATE':
        return {
          icon: Plus,
          label: 'Create',
          color: 'text-emerald-600 dark:text-emerald-400',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
          borderColor: 'border-emerald-200 dark:border-emerald-800'
        }
      case 'UPDATE':
        return {
          icon: Edit,
          label: 'Update',
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-950/20',
          borderColor: 'border-blue-200 dark:border-blue-800'
        }
      case 'DELETE':
        return {
          icon: Trash2,
          label: 'Delete',
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-50 dark:bg-red-950/20',
          borderColor: 'border-red-200 dark:border-red-800'
        }
      default:
        return {
          icon: FileText,
          label: 'Modify',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-50 dark:bg-gray-950/20',
          borderColor: 'border-gray-200 dark:border-gray-800'
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="h-8 bg-muted rounded-lg w-64 animate-pulse"></div>
            <div className="h-6 bg-muted rounded-full w-24 animate-pulse"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 bg-muted rounded animate-pulse"></div>
                        <div className="h-6 bg-muted rounded w-48 animate-pulse"></div>
                        <div className="h-5 bg-muted rounded-full w-16 animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Approval Requests</h1>
            <p className="text-muted-foreground mt-1">Review and manage content change requests</p>
          </div>
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-sm font-medium bg-muted text-muted-foreground"
          >
            <Clock className="h-3 w-3 mr-1" />
            {approvals.length} pending
          </Badge>
        </div>

        {/* Content */}
        {approvals.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">All caught up!</h3>
              <p className="text-muted-foreground text-center max-w-md">
                No pending approval requests at the moment. New requests will appear here when MAIN_MANAGER users submit changes.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {approvals.map((approval) => {
              const actionConfig = getActionConfig(approval.action)
              const ActionIcon = actionConfig.icon
              const isExpanded = expandedId === approval.id

              return (
                <Card
                  id={`approval-${approval.id}`}
                  key={approval.id}
                  className="overflow-hidden border-l-4 transition-all duration-200 hover:shadow-md"
                  style={{ borderLeftColor: actionConfig.color.includes('emerald') ? '#10b981' :
                                           actionConfig.color.includes('blue') ? '#3b82f6' :
                                           actionConfig.color.includes('red') ? '#ef4444' : '#6b7280' }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${actionConfig.bgColor} ${actionConfig.borderColor} border`}>
                            <ActionIcon className={`h-5 w-5 ${actionConfig.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-foreground">
                              {actionConfig.label} {approval.resourceType}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {approval.enhancedPayload?.summary || `${actionConfig.label} request for ${approval.resourceType.toLowerCase()}`}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs border-muted-foreground/20 text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{approval.requester?.name || 'Unknown'}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4" />
                            <span>ID: {approval.resourceId || 'New'}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(approval.id)}
                        className="shrink-0 h-8 w-8 p-0 hover:bg-muted"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <>
                      <Separator />
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          {/* Changes Display */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Changes Requested
                            </h4>

                            {approval.enhancedPayload ? (
                              <div className="space-y-4">
                                {approval.enhancedPayload.type === 'UPDATE' && approval.enhancedPayload.changes && (
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2 mb-3">
                                      <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                      <span className="font-medium text-blue-700 dark:text-blue-300">Field Changes</span>
                                    </div>
                                    {Object.keys(approval.enhancedPayload.changes).length > 0 ? (
                                      Object.entries(approval.enhancedPayload.changes).map(([field, change]) => (
                                        <div key={field} className="bg-muted/50 border border-border rounded-lg p-4">
                                          <div className="font-medium text-sm text-muted-foreground mb-2 capitalize">
                                            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).toLowerCase()}
                                          </div>
                                          <div className="flex items-center gap-3 text-sm">
                                            <div className="flex-1">
                                              <div className="text-red-600 dark:text-red-400 line-through bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded">
                                                {change.from === null || change.from === undefined ? 'empty' :
                                                 Array.isArray(change.from) ? change.from.join(', ') :
                                                 typeof change.from === 'object' ? JSON.stringify(change.from) :
                                                 String(change.from)}
                                              </div>
                                            </div>
                                            <div className="text-muted-foreground font-medium">→</div>
                                            <div className="flex-1">
                                              <div className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-2 py-1 rounded">
                                                {change.to === null || change.to === undefined ? 'empty' :
                                                 Array.isArray(change.to) ? change.to.join(', ') :
                                                 typeof change.to === 'object' ? JSON.stringify(change.to) :
                                                 String(change.to)}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="text-sm text-muted-foreground italic">
                                        No changes detected in the payload
                                      </div>
                                    )}
                                  </div>
                                )}

                                {approval.enhancedPayload.type === 'DELETE' && (
                                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                      <span className="font-semibold text-red-700 dark:text-red-300">Deletion Warning</span>
                                    </div>
                                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                                      This will permanently delete the following {approval.resourceType.toLowerCase()}:
                                    </p>
                                    {approval.enhancedPayload.currentData && (
                                      <div className="bg-background border border-border rounded-md p-3">
                                        <div className="grid gap-2 text-sm">
                                          {Object.entries(approval.enhancedPayload.currentData)
                                            .filter(([key]) => !['id', 'createdAt', 'updatedAt'].includes(key))
                                            .map(([key, value]) => (
                                              <div key={key} className="flex justify-between">
                                                <span className="font-medium capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).toLowerCase()}:</span>
                                                <span className="text-foreground ml-2 text-right max-w-xs truncate" title={String(value || 'N/A')}>
                                                  {value === null || value === undefined ? 'N/A' :
                                                   Array.isArray(value) ? value.join(', ') :
                                                   typeof value === 'string' && value.length > 50 ? `${value.substring(0, 50)}...` :
                                                   String(value)}
                                                </span>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {approval.enhancedPayload.type === 'CREATE' && (
                                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                      <Plus className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">Creation Request</span>
                                    </div>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-4">
                                      This will create a new {approval.resourceType.toLowerCase()} with the following data:
                                    </p>
                                    <div className="bg-background border border-border rounded-md p-3">
                                      <div className="grid gap-2 text-sm">
                                        {Object.entries(approval.enhancedPayload.newData || {})
                                          .filter(([key]) => !['id', 'createdAt', 'updatedAt'].includes(key))
                                          .map(([key, value]) => (
                                            <div key={key} className="flex justify-between">
                                              <span className="font-medium capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).toLowerCase()}:</span>
                                              <span className="text-foreground ml-2 text-right max-w-xs truncate" title={String(value || 'N/A')}>
                                                {value === null || value === undefined ? 'N/A' :
                                                 Array.isArray(value) ? value.join(', ') :
                                                 typeof value === 'string' && value.length > 50 ? `${value.substring(0, 50)}...` :
                                                 String(value)}
                                              </span>
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {(approval.enhancedPayload.type !== 'UPDATE' && approval.enhancedPayload.type !== 'DELETE' && approval.enhancedPayload.type !== 'CREATE') && (
                                  <div className="bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                      <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                      <span className="font-semibold text-gray-700 dark:text-gray-300">{approval.enhancedPayload.type} Action</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                      {approval.enhancedPayload.summary || `${approval.enhancedPayload.type} action on ${approval.resourceType}`}
                                    </p>
                                    {approval.enhancedPayload.rawData && (
                                      <pre className="bg-background border border-border rounded-md p-3 text-xs overflow-x-auto">
                                        {JSON.stringify(approval.enhancedPayload.rawData, null, 2)}
                                      </pre>
                                    )}
                                  </div>
                                )}

                                <div className="text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-md border">
                                  {approval.enhancedPayload.summary}
                                </div>
                              </div>
                            ) : (
                              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap border">
                                {JSON.stringify(approval.payload, null, 2)}
                              </pre>
                            )}
                          </div>

                          {/* Reason */}
                          {approval.reason && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Reason for Request
                              </h4>
                              <div className="bg-muted/50 border border-border rounded-lg p-4">
                                <p className="text-sm text-foreground leading-relaxed">
                                  {approval.reason}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                            <Button
                              onClick={() => setConfirmAction({ id: approval.id, action: 'approve' })}
                              disabled={actionLoading === approval.id}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              {actionLoading === approval.id ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4 mr-2" />
                              )}
                              {actionLoading === approval.id ? 'Processing...' : 'Approve Changes'}
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => setConfirmAction({ id: approval.id, action: 'reject' })}
                              disabled={actionLoading === approval.id}
                              className="flex-1"
                            >
                              {actionLoading === approval.id ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <X className="h-4 w-4 mr-2" />
                              )}
                              {actionLoading === approval.id ? 'Processing...' : 'Reject Changes'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              )
            })}
          </div>
        )}

        {/* Confirmation Dialog */}
        <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                {confirmAction?.action === 'approve' ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    Approve Request
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    Reject Request
                  </>
                )}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                Are you sure you want to <span className="font-semibold">{confirmAction?.action}</span> this{' '}
                <span className="font-semibold">
                  {approvals.find(a => a.id === confirmAction?.id)?.resourceType.toLowerCase()}
                </span>{' '}
                {confirmAction?.action === 'approve' ? 'update' : 'rejection'}?
                {confirmAction?.action === 'reject' && (
                  <span className="block mt-2 text-red-600 dark:text-red-400 font-medium">
                    ⚠️ This action cannot be undone.
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => confirmAction && handleAction(confirmAction.id, confirmAction.action)}
                className={`w-full sm:w-auto ${
                  confirmAction?.action === 'reject'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {confirmAction?.action === 'approve' ? 'Approve' : 'Reject'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}