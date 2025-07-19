import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApiKeySetup } from "@/components/ApiKeySetup";
import { useApiKeys } from "@/hooks/useApiKeys";
import { GitHubAPI } from "@/lib/github-api";
import { OpenAIAPI } from "@/lib/openai-api";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus,
  GitBranch,
  Settings,
  Activity,
  Calendar,
  Star,
  ExternalLink,
  Loader2,
  Brain
} from "lucide-react";

interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  lastActivity: string;
  status: "active" | "paused" | "error";
  summariesCount: number;
  private: boolean;
}

const Repositories = () => {
  const { githubToken, openaiKey, isConfigured, saveApiKeys } = useApiKeys();
  const { toast } = useToast();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const loadRepos = async () => {
    if (!githubToken) return;
    
    setIsLoading(true);
    try {
      const githubAPI = new GitHubAPI(githubToken);
      const githubRepos = await githubAPI.getUserRepos();
      
      const formattedRepos: Repository[] = githubRepos.map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || "No description available",
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        lastActivity: new Date(repo.updated_at).toLocaleDateString(),
        status: "active" as const,
        summariesCount: 0,
        private: repo.private,
      }));
      
      setRepos(formattedRepos);
      toast({
        title: "Repositories loaded",
        description: `Found ${formattedRepos.length} repositories`,
      });
    } catch (error) {
      toast({
        title: "Error loading repositories", 
        description: error instanceof Error ? error.message : "Failed to load repositories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSummary = async (repo: Repository) => {
    if (!githubToken || !openaiKey) return;
    
    setIsGenerating(repo.fullName);
    try {
      const githubAPI = new GitHubAPI(githubToken);
      const openaiAPI = new OpenAIAPI(openaiKey);
      
      const [owner, repoName] = repo.fullName.split('/');
      const activity = await githubAPI.getRepoActivity(owner, repoName);
      
      const summary = await openaiAPI.generateDailySummary({
        commits: activity.commits,
        prs: activity.prs,
        repoName: repo.fullName,
        dateRange: "Last 24 hours"
      });
      
      // Store summary in localStorage for now
      const summaries = JSON.parse(localStorage.getItem('devintel_summaries') || '[]');
      summaries.push({
        id: Date.now(),
        repoName: repo.fullName,
        content: summary,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('devintel_summaries', JSON.stringify(summaries));
      
      toast({
        title: "Summary generated",
        description: `AI summary created for ${repo.name}`,
      });
    } catch (error) {
      toast({
        title: "Error generating summary",
        description: error instanceof Error ? error.message : "Failed to generate summary", 
        variant: "destructive",
      });
    } finally {
      setIsGenerating(null);
    }
  };

  useEffect(() => {
    if (isConfigured) {
      loadRepos();
    }
  }, [isConfigured]);

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

  if (!isConfigured) {
    return <ApiKeySetup onKeysSubmit={saveApiKeys} />;
  }

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
        <Button onClick={loadRepos} disabled={isLoading} className="gap-2">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isLoading ? "Loading..." : "Refresh Repositories"}
        </Button>
      </div>

      {/* Repository Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => generateSummary(repo)}
                  disabled={isGenerating === repo.fullName}
                >
                  {isGenerating === repo.fullName ? (
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Brain className="w-3 h-3 mr-1" />
                  )}
                  {isGenerating === repo.fullName ? "Generating..." : "Generate Summary"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://github.com/${repo.fullName}`, '_blank')}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {repos.length === 0 && !isLoading && (
          <Card className="border-dashed border-2 col-span-full">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">No Repositories Found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Make sure your GitHub token has access to repositories
              </p>
              <Button size="sm" onClick={loadRepos}>
                Refresh Repositories
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Repositories;