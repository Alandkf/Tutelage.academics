import DashboardOverview from '@/components/admin/MainPage/DashboardOverview';
import DashboardUsersTable from '@/components/admin/MainPage/DashboardUsersTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const Page = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold md:text-2xl">Dashboard Overview</h1>
      
      <DashboardOverview />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Left table placeholder */}
        <Card className="min-h-[500px]">
          <div className="bg-muted/50 rounded-lg border-2 border-dashed flex items-center justify-center h-full">
            <p className="text-muted-foreground">Left Table Coming Soon</p>
          </div>
        </Card>

        {/* Right table - Users */}
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage and track your users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardUsersTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page