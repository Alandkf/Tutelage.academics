'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import BASE_URL from '@/app/config/url';
import DashboardUsersTableSkeleton from '../../skeletons/DashboardUsersTableSkeleton';

export function DashboardUsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  
 useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/users`, {
          credentials: 'include'
        })
        const data = await res.json()
        
        if (data.success) {
          // Get only first 5 users
          setUsers(data.users.slice(0, 5))
        } else {
          console.error('Failed to fetch users:', data.message)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
        setError(error.message)
      } finally{
        setLoading(false);
      }
    }

    fetchUsers()
  }, [])
  
  const displayedUsers = users.slice(0, 5);
  
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'MAIN_MANAGER':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'ADMIN':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusBadgeColor = (isActive) => {
    return isActive
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const viewAllUsersHandler = () => {
    router.push('/admin-dashboard/users');
  }

  if (loading) {
    return <>
    <DashboardUsersTableSkeleton />
    </>;
  }

  if (error) {
    return <div className="w-full py-4 text-center text-sm text-red-500">Error loading users: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              displayedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadgeColor(user.isActive)}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-left">
        <Button variant="outline" size="sm" onClick={viewAllUsersHandler}>
          View All Users
        </Button>
      </div>
    </div>
  );
}

export default DashboardUsersTable;
