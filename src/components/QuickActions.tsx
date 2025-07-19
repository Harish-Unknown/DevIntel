import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus,
  RefreshCw,
  Download,
  Settings,
  Zap,
  GitBranch
} from "lucide-react";

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary";
}

function QuickActionButton({ title, description, icon, onClick, variant = "outline" }: QuickActionProps) {
  return (
    <Button 
      variant={variant}
      className="h-auto p-4 flex-col gap-2 text-left justify-start"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 w-full">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground w-full">{description}</p>
    </Button>
  );
}

export function QuickActions() {
  const actions = [
    {
      title: "Add Repository",
      description: "Connect a new GitHub repo to track",
      icon: <Plus className="w-4 h-4" />,
      onClick: () => console.log("Add repository"),
      variant: "default" as const,
    },
    {
      title: "Generate Summary",
      description: "Create AI summary for today",
      icon: <Zap className="w-4 h-4" />,
      onClick: () => console.log("Generate summary"),
    },
    {
      title: "Refresh Data",
      description: "Pull latest GitHub activity",
      icon: <RefreshCw className="w-4 h-4" />,
      onClick: () => console.log("Refresh data"),
    },
    {
      title: "Export Report",
      description: "Download summary as PDF/MD",
      icon: <Download className="w-4 h-4" />,
      onClick: () => console.log("Export report"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <QuickActionButton key={index} {...action} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}