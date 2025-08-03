import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Shirt, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Categories",
      value: "12",
      description: "+2 from last month",
      icon: Package,
      trend: "up",
    },
    {
      title: "Fabric Items",
      value: "248",
      description: "+15 from last month",
      icon: Package,
      trend: "up",
    },
    {
      title: "Readymade Products",
      value: "89",
      description: "+8 from last month",
      icon: Shirt,
      trend: "up",
    },
    {
      title: "Monthly Profit",
      value: "$12,450",
      description: "+12% from last month",
      icon: TrendingUp,
      trend: "up",
    },
  ]

  const recentActivities = [
    { action: "New fabric added", item: "Cotton Blend #CB001", time: "2 hours ago" },
    { action: "Category updated", item: "Silk Collection", time: "4 hours ago" },
    { action: "Product sold", item: "Readymade Shirt #RS045", time: "6 hours ago" },
    { action: "New category created", item: "Premium Wool", time: "1 day ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your fabric factory.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your fabric factory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for factory management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Add New Fabric</p>
                <p className="text-sm text-muted-foreground">Create fabric entry</p>
              </div>
              <Badge variant="secondary">Quick</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Create Category</p>
                <p className="text-sm text-muted-foreground">Organize products</p>
              </div>
              <Badge variant="secondary">Setup</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">View Reports</p>
                <p className="text-sm text-muted-foreground">Check profits</p>
              </div>
              <Badge variant="secondary">Analysis</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
