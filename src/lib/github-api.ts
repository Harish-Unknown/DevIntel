interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  private: boolean;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubPR {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  user: {
    login: string;
  };
  changed_files: number;
  additions: number;
  deletions: number;
}

export class GitHubAPI {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request(endpoint: string) {
    const response = await fetch(`https://api.github.com${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUserRepos(): Promise<GitHubRepo[]> {
    return this.request('/user/repos?sort=updated&per_page=50');
  }

  async getRepoDetails(owner: string, repo: string): Promise<GitHubRepo> {
    return this.request(`/repos/${owner}/${repo}`);
  }

  async getRecentCommits(owner: string, repo: string, since?: string): Promise<GitHubCommit[]> {
    const sinceParam = since ? `&since=${since}` : '';
    return this.request(`/repos/${owner}/${repo}/commits?per_page=50${sinceParam}`);
  }

  async getRecentPRs(owner: string, repo: string, state: 'open' | 'closed' | 'all' = 'all'): Promise<GitHubPR[]> {
    return this.request(`/repos/${owner}/${repo}/pulls?state=${state}&sort=updated&per_page=50`);
  }

  async getPRDetails(owner: string, repo: string, prNumber: number): Promise<GitHubPR> {
    return this.request(`/repos/${owner}/${repo}/pulls/${prNumber}`);
  }

  async getRepoActivity(owner: string, repo: string) {
    const [commits, prs] = await Promise.all([
      this.getRecentCommits(owner, repo, new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
      this.getRecentPRs(owner, repo),
    ]);

    return { commits, prs };
  }
}