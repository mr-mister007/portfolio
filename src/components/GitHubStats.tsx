import { useEffect, useState } from 'react';
import { Star, GitFork } from 'lucide-react';

interface Repo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  language_color?: string;
}

const LANG_COLORS: Record<string, string> = {
  Go: '#00ADD8',
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Shell: '#89E051',
  HCL: '#844FBA',
  Rust: '#DEA584',
  Dockerfile: '#384D54',
};

/**
 * Fetches pinned / recent repos from the GitHub API
 * and renders them as a neat grid.
 */
const GitHubStats: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/aravind/repos?sort=updated&per_page=6', {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then((data: Repo[]) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-surface/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono font-semibold text-text-primary tracking-wider uppercase">GitHub</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border border-border/30 p-3 animate-pulse">
              <div className="h-4 w-24 bg-text-secondary/10 rounded mb-2" />
              <div className="h-3 w-full bg-text-secondary/10 rounded mb-2" />
              <div className="h-3 w-16 bg-text-secondary/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || repos.length === 0) {
    // Fallback mock data
    return (
      <div className="rounded-xl border border-border bg-surface/30 overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-surface/20 flex items-center gap-2">
          <Star size={12} className="text-accent" />
          <span className="text-xs font-mono font-semibold text-text-primary tracking-wider uppercase">GitHub — Repositories</span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-center h-20 text-text-secondary/50 text-xs font-mono">
            <p>Could not load repos. Connect to the internet or add a GitHub token.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface/30 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-surface/20 flex items-center gap-2">
        <Star size={12} className="text-accent" />
        <span className="text-xs font-mono font-semibold text-text-primary tracking-wider uppercase">
          GitHub — Recent Repos
        </span>
      </div>

      {/* Repo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
        {repos.map((repo) => {
          const color = LANG_COLORS[repo.language] || '#8B8B8B';
          return (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border/30 p-3 hover:border-accent/30 hover:bg-accent-muted/20 transition-all group"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">
                  {repo.name}
                </span>
                {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
                  <div className="flex items-center gap-2 shrink-0">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-0.5 text-[11px] text-text-secondary">
                        <Star size={10} /> {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-0.5 text-[11px] text-text-secondary">
                        <GitFork size={10} /> {repo.forks_count}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {repo.description && (
                <p className="text-xs text-text-secondary/70 leading-relaxed mb-2 line-clamp-2">
                  {repo.description}
                </p>
              )}

              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[10px] text-text-secondary font-mono">{repo.language}</span>
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default GitHubStats;
