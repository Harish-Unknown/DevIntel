import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Github, Brain } from "lucide-react";

interface ApiKeySetupProps {
  onKeysSubmit: (githubToken: string, openaiKey: string) => void;
}

export const ApiKeySetup = ({ onKeysSubmit }: ApiKeySetupProps) => {
  const [githubToken, setGithubToken] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      onKeysSubmit(githubToken, openaiKey);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Key className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Setup API Keys</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your GitHub and OpenAI API keys to start generating summaries
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-token" className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub Personal Access Token
              </Label>
              <Input
                id="github-token"
                type="password"
                placeholder="ghp_xxxxxxxxxxxx"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Create at{" "}
                <a 
                  href="https://github.com/settings/tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/settings/tokens
                </a>
                {" "}with repo access
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="openai-key" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                OpenAI API Key
              </Label>
              <Input
                id="openai-key"
                type="password"
                placeholder="sk-xxxxxxxxxxxx"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Get your key at{" "}
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  platform.openai.com/api-keys
                </a>
              </p>
            </div>

            <Alert>
              <AlertDescription className="text-xs">
                Your API keys are stored locally in your browser and never sent to our servers.
              </AlertDescription>
            </Alert>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!githubToken || !openaiKey || isLoading}
            >
              {isLoading ? "Connecting..." : "Connect APIs"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};