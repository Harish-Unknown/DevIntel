interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GitHubActivityData {
  commits: any[];
  prs: any[];
  repoName: string;
  dateRange: string;
}

export class OpenAIAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(messages: OpenAIMessage[]) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using mini for free tier
        messages,
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async generateDailySummary(activityData: GitHubActivityData): Promise<string> {
    const systemPrompt = `You are DevIntel, an AI assistant that analyzes GitHub activity and creates clear, actionable daily summaries for product managers and developers.

Your job is to analyze commits, pull requests, and code changes, then output a structured markdown summary.

Focus on:
- Features developed or progressed
- Code under review or blocked
- Technical risks or high-churn areas
- Features ready to ship
- Overall development velocity and health

Output format should be clean markdown with these sections:
## Daily Summary – [Date]
### 🚀 Features Developed Today
### 🔄 In Progress / Under Review  
### ⚠️ Risks & High Churn
### 🚢 Ready to Ship
### 📊 Development Health

Be concise but informative. Focus on business impact, not just technical details.`;

    const userPrompt = `Analyze this GitHub activity for ${activityData.repoName} (${activityData.dateRange}):

**Recent Commits:**
${activityData.commits.map(commit => 
  `- ${commit.commit.message} (by ${commit.commit.author.name})`
).join('\n')}

**Recent Pull Requests:**
${activityData.prs.map(pr => 
  `- #${pr.number}: ${pr.title} (${pr.state}) - ${pr.changed_files} files, +${pr.additions}/-${pr.deletions}`
).join('\n')}

Generate a comprehensive daily summary.`;

    return this.request([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }
}