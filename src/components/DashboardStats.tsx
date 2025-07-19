import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GitCommit, 
  GitPullRequest, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Clock
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "stable";
  status?: "success" | "warning" | "error" | "info";
}

function StatsCard({ title, value, description, icon, trend, status }: StatsCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "error": return "text-destructive";
      default: return "text-primary";
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg bg-secondary/20 ${getStatusColor()}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="w-3 h-3 text-success mr-1" />
            <span className="text-xs text-success">+12% from yesterday</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Commits Today",
      value: 24,
      description: "Across 3 repositories",
      icon: <GitCommit className="w-4 h-4" />,
      trend: "up" as const,
      status: "success" as const,
    },
    {
      title: "Active PRs",
      value: 8,
      description: "2 ready for review",
      icon: <GitPullRequest className="w-4 h-4" />,
      status: "info" as const,
    },
    {
      title: "Risks Detected",
      value: 3,
      description: "High churn areas",
      icon: <AlertTriangle className="w-4 h-4" />,
      status: "warning" as const,
    },
    {
      title: "Features Ready",
      value: 5,
      description: "Approved for deployment",
      icon: <CheckCircle className="w-4 h-4" />,
      status: "success" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}