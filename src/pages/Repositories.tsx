import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  GitBranch,
  Settings,
  Activity,
  Calendar,
  Star,
  ExternalLink
} from "lucide-react";

interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  lastActivity: string;
  status: "active" | "paused" | "error";
  summariesCount: number;
}

const mockRepos: Repository[] = [
  {
    id: "1",
    name: "frontend-app",
    fullName: "company/frontend-app",
    description: "Main React frontend application",
    language: "TypeScript",
    stars: 42,
    lastActivity: "2 hours ago",
    status: "active",
    summariesCount: 15,
  },
  {
    id: "2",
    name: "api-backend",
    fullName: "company/api-backend",
    description: "Node.js REST API backend",
    language: "JavaScript",
    stars: 28,
    lastActivity: "5 hours ago", 
    status: "active",
    summariesCount: 12,
  },
  {
    id: "3",
    name: "mobile-app",
    fullName: "company/mobile-app",
    description: "React Native mobile application",
    language: "TypeScript",
    stars: 18,
    lastActivity: "1 day ago",
    status: "paused",
    summariesCount: 8,
  },
];

const Repositories = () => {
  const getStatusBadge = (status: Repository["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>;
      case "paused":
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Paused</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Repositories</h1>
          <p className="text-muted-foreground mt-1">
            Manage GitHub repositories for AI summary generation
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Repository
        </Button>
      </div>

      {/* Repository Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRepos.map((repo) => (
          <Card key={repo.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{repo.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{repo.fullName}</p>
                  </div>
                </div>
                {getStatusBadge(repo.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{repo.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${repo.language === 'TypeScript' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-3 h-3" />
                    {repo.stars}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  {repo.lastActivity}
                </span>
                <span>{repo.summariesCount} summaries</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="w-3 h-3 mr-1" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Repository Card */}
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Add Repository</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect a new GitHub repository to start generating AI summaries
            </p>
            <Button size="sm">Connect Repository</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Repositories;