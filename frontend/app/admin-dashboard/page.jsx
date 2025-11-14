import DashboardOverview from '@/components/admin/MainPage/DashboardOverview';

const Page = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold md:text-2xl">Dashboard Overview</h1>
      
      <DashboardOverview />
    </div>
  )
}

export default Page