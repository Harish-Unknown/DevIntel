import { DashboardStats } from "@/components/DashboardStats";
import { RecentSummaries } from "@/components/RecentSummaries";
import { QuickActions } from "@/components/QuickActions";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">DevIntel Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered GitHub activity summaries for your development team
        </p>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentSummaries />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Index;
