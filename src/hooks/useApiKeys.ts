import { useState, useEffect } from 'react';

export const useApiKeys = () => {
  const [githubToken, setGithubToken] = useState<string>('');
  const [openaiKey, setOpenaiKey] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Load API keys from localStorage
    const savedGithubToken = localStorage.getItem('devintel_github_token');
    const savedOpenaiKey = localStorage.getItem('devintel_openai_key');

    if (savedGithubToken && savedOpenaiKey) {
      setGithubToken(savedGithubToken);
      setOpenaiKey(savedOpenaiKey);
      setIsConfigured(true);
    }
  }, []);

  const saveApiKeys = (github: string, openai: string) => {
    localStorage.setItem('devintel_github_token', github);
    localStorage.setItem('devintel_openai_key', openai);
    setGithubToken(github);
    setOpenaiKey(openai);
    setIsConfigured(true);
  };

  const clearApiKeys = () => {
    localStorage.removeItem('devintel_github_token');
    localStorage.removeItem('devintel_openai_key');
    setGithubToken('');
    setOpenaiKey('');
    setIsConfigured(false);
  };

  return {
    githubToken,
    openaiKey,
    isConfigured,
    saveApiKeys,
    clearApiKeys,
  };
};