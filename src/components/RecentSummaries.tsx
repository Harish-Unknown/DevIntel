import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  GitBranch,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink
} from "lucide-react";

interface SummaryItem {
  id: string;
  date: string;
  repository: string;
  status: "completed" | "processing" | "error";
  featuresCount: number;
  risksCount: number;
  readyToShip: number;
}

const mockSummaries: SummaryItem[] = [
  {
    id: "1",
    date: "2024-07-19",
    repository: "frontend-app",
    status: "completed",
    featuresCount: 3,
    risksCount: 1,
    readyToShip: 2,
  },
  {
    id: "2", 
    date: "2024-07-19",
    repository: "api-backend",
    status: "completed",
    featuresCount: 2,
    risksCount: 0,
    readyToShip: 1,
  },
  {
    id: "3",
    date: "2024-07-18",
    repository: "frontend-app",
    status: "completed",
    featuresCount: 1,
    risksCount: 2,
    readyToShip: 0,
  },
];

export function RecentSummaries() {
  const getStatusBadge = (status: SummaryItem["status"]) => {
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent AI Summaries</CardTitle>
          <Button variant="outline" size="sm">
            View All
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSummaries.map((summary) => (
            <div 
              key={summary.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{summary.repository}</h4>
                    {getStatusBadge(summary.status)}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {summary.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {summary.featuresCount} features
                    </span>
                    {summary.risksCount > 0 && (
                      <span className="flex items-center gap-1 text-warning">
                        <AlertTriangle className="w-3 h-3" />
                        {summary.risksCount} risks
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {summary.readyToShip} ready to ship
                </div>
                <div className="text-xs text-muted-foreground">
                  Click to view details
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}