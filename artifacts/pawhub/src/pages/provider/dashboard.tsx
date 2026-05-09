import { useGetProviderDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProviderDashboard() {
  const { data: dashboard, isLoading } = useGetProviderDashboard();

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (!dashboard) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold font-serif">Provider Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pending Requests</CardTitle></CardHeader>
          <CardContent><div className="text-4xl font-bold font-serif text-primary">{dashboard.pendingCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Upcoming</CardTitle></CardHeader>
          <CardContent><div className="text-4xl font-bold font-serif">{dashboard.upcomingCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Completed</CardTitle></CardHeader>
          <CardContent><div className="text-4xl font-bold font-serif">{dashboard.completedCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Earnings</CardTitle></CardHeader>
          <CardContent><div className="text-4xl font-bold font-serif">${(dashboard.totalEarningsCents / 100).toFixed(2)}</div></CardContent>
        </Card>
      </div>
    </div>
  );
}
