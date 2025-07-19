import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GitCommit,
  GitPullRequest,
  GitMerge,
  MessageSquare,
  User,
  Calendar,
  ExternalLink,
  Filter,
  RefreshCw
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "commit" | "pr_opened" | "pr_merged" | "pr_reviewed" | "comment";
  title: string;
  description: string;
  author: string;
  repository: string;
  timestamp: string;
  url?: string;
  status?: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "commit",
    title: "Add Redis caching to auth service",
    description: "Implements Redis-based caching for user authentication to improve performance",
    author: "john.doe",
    repository: "frontend-app",
    timestamp: "2 hours ago",
    url: "#",
  },
  {
    id: "2", 
    type: "pr_opened",
    title: "Feature: Dark mode implementation",
    description: "Adds complete dark mode support with theme switching functionality",
    author: "jane.smith",
    repository: "frontend-app", 
    timestamp: "3 hours ago",
    status: "open",
    url: "#",
  },
  {
    id: "3",
    type: "pr_merged",
    title: "Fix: Memory leak in websocket connections",
    description: "Resolves memory leak issue when websocket connections are not properly closed",
    author: "mike.wilson",
    repository: "api-backend",
    timestamp: "4 hours ago",
    url: "#",
  },
  {
    id: "4",
    type: "pr_reviewed", 
    title: "Update user dashboard analytics",
    description: "Adds new metrics and improves performance of dashboard queries",
    author: "sarah.connor",
    repository: "frontend-app",
    timestamp: "5 hours ago",
    status: "approved",
    url: "#",
  },
  {
    id: "5",
    type: "comment",
    title: "Security review needed for auth changes",
    description: "Please review the session handling logic for potential race conditions",
    author: "security.bot",
    repository: "frontend-app",
    timestamp: "6 hours ago",
    url: "#",
  },
];

const Activity = () => {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "commit":
        return <GitCommit className="w-4 h-4" />;
      case "pr_opened":
        return <GitPullRequest className="w-4 h-4" />;
      case "pr_merged":
        return <GitMerge className="w-4 h-4" />;
      case "pr_reviewed":
        return <GitPullRequest className="w-4 h-4" />;
      case "comment":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <GitCommit className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "commit":
        return "text-primary bg-primary/10";
      case "pr_opened":
        return "text-accent bg-accent/10";
      case "pr_merged":
        return "text-success bg-success/10";
      case "pr_reviewed":
        return "text-warning bg-warning/10";
      case "comment":
        return "text-muted-foreground bg-secondary";
      default:
        return "text-muted-foreground bg-secondary";
    }
  };

  const getStatusBadge = (type: ActivityItem["type"], status?: string) => {
    if (type === "pr_opened") {
      return <Badge variant="secondary" className="bg-accent/10 text-accent">Open</Badge>;
    }
    if (type === "pr_merged") {
      return <Badge variant="secondary" className="bg-success/10 text-success">Merged</Badge>;
    }
    if (type === "pr_reviewed" && status === "approved") {
      return <Badge variant="secondary" className="bg-success/10 text-success">Approved</Badge>;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Feed</h1>
          <p className="text-muted-foreground mt-1">
            Real-time GitHub activity across your connected repositories
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {mockActivity.map((activity, index) => (
              <div 
                key={activity.id}
                className={`p-4 hover:bg-secondary/20 transition-colors ${
                  index !== mockActivity.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Activity Icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{activity.title}</h4>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(activity.type, activity.status)}
                        {activity.url && (
                          <Button variant="ghost" size="sm" className="p-1 h-auto">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{activity.description}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {activity.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitCommit className="w-3 h-3" />
                        {activity.repository}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;