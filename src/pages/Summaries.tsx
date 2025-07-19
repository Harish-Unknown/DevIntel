import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  GitBranch,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  Filter,
  Zap
} from "lucide-react";

interface Summary {
  id: string;
  date: string;
  repository: string;
  title: string;
  content: string;
  status: "completed" | "processing" | "error";
  featuresCount: number;
  risksCount: number;
  readyToShip: number;
  generatedAt: string;
}

const mockSummaries: Summary[] = [
  {
    id: "1",
    date: "2024-07-19",
    repository: "frontend-app",
    title: "Daily Summary – July 19",
    content: `## Features Developed Today
- **Auth Performance Boost**: Redis cache added to login flow. Aims to reduce DB load.
- **User Dashboard**: New analytics widgets for user engagement metrics.
- **Dark Mode**: Theme switching functionality completed and tested.

## In Review
- \`authService.ts\` touched – under active review for session invalidation logic.
- Profile settings UI pending design review.

## Risks
- Risk of stale sessions or auth race conditions. Needs full regression test.
- New dashboard widgets may impact page load performance.

## Ready to Ship
- Auth cache update approved by 2 reviewers. Merge complete today.
- Dark mode toggle tested across all components.`,
    status: "completed",
    featuresCount: 3,
    risksCount: 2,
    readyToShip: 2,
    generatedAt: "10:30 AM",
  },
  {
    id: "2",
    date: "2024-07-19", 
    repository: "api-backend",
    title: "Daily Summary – July 19",
    content: `## Features Developed Today
- **Rate Limiting**: Implemented Redis-based rate limiting for API endpoints.
- **Webhook Security**: Added HMAC signature verification for GitHub webhooks.

## In Review  
- Rate limiting configuration under security review.

## Risks
- None detected today.

## Ready to Ship
- Webhook security enhancement approved and deployed.`,
    status: "completed",
    featuresCount: 2,
    risksCount: 0,
    readyToShip: 1,
    generatedAt: "11:15 AM",
  },
];

const Summaries = () => {
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(mockSummaries[0]);

  const getStatusBadge = (status: Summary["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-success/10 text-success">Completed</Badge>;
      case "processing":
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Processing</Badge>;
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
          <h1 className="text-3xl font-bold text-foreground">Daily Summaries</h1>
          <p className="text-muted-foreground mt-1">
            AI-generated development summaries from GitHub activity
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
          <Button size="sm">
            <Zap className="w-4 h-4 mr-1" />
            Generate Summary
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Summaries List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Summaries</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {mockSummaries.map((summary) => (
                  <div 
                    key={summary.id}
                    className={`p-4 border-b border-border cursor-pointer hover:bg-secondary/20 transition-colors ${
                      selectedSummary?.id === summary.id ? 'bg-secondary/30 border-l-4 border-l-primary' : ''
                    }`}
                    onClick={() => setSelectedSummary(summary)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{summary.repository}</h4>
                        {getStatusBadge(summary.status)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {summary.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {summary.generatedAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-success">
                          <CheckCircle className="w-3 h-3" />
                          {summary.featuresCount} features
                        </span>
                        {summary.risksCount > 0 && (
                          <span className="flex items-center gap-1 text-warning">
                            <AlertTriangle className="w-3 h-3" />
                            {summary.risksCount} risks
                          </span>
                        )}
                        <span className="text-muted-foreground">
                          {summary.readyToShip} ready
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Detail */}
        <div className="lg:col-span-2">
          {selectedSummary ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedSummary.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedSummary.repository} • Generated at {selectedSummary.generatedAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                    {getStatusBadge(selectedSummary.status)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {selectedSummary.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center p-12">
                <div className="text-center">
                  <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Summary</h3>
                  <p className="text-muted-foreground">
                    Choose a summary from the list to view its details
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summaries;