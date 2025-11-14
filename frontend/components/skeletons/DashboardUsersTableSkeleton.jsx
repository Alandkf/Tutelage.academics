"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const DashboardUsersTableSkeleton = () => {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-4 w-12" /></TableHead>
              <TableHead><Skeleton className="h-4 w-12" /></TableHead>
              <TableHead><Skeleton className="h-4 w-12" /></TableHead>
              <TableHead><Skeleton className="h-4 w-12" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-14 rounded-full" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-left">
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  )
}

export default DashboardUsersTableSkeleton
