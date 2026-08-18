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

const FALLBACK_REPOS: Repo[] = [
  {
    name: 'portfolio',
    description: '3D Creator & DevOps Platform Engineer portfolio built with React, Vite, Three.js, and Framer Motion.',
    stargazers_count: 12,
    forks_count: 3,
    language: 'TypeScript',
    html_url: 'https://github.com/mr-mister007/portfolio',
  },
  {
    name: 'k8s-gitops-infra',
    description: 'Declarative Kubernetes cluster configuration and GitOps deployment pipeline using ArgoCD & Helm.',
    stargazers_count: 28,
    forks_count: 7,
    language: 'HCL',
    html_url: 'https://github.com/mr-mister007',
  },
  {
    name: 'terraform-aws-modules',
    description: 'Production-ready reusable Terraform modules for EKS, VPC networking, and cloud security monitoring.',
    stargazers_count: 45,
    forks_count: 14,
    language: 'Go',
    html_url: 'https://github.com/mr-mister007',
  },
  {
    name: 'prometheus-exporter-tools',
    description: 'Custom microservice telemetry and observability exporter built with Python and Grafana dashboards.',
    stargazers_count: 19,
    forks_count: 5,
    language: 'Python',
    html_url: 'https://github.com/mr-mister007',
  },
];

/**
 * Fetches pinned / recent repos from the GitHub API
 * and renders them as a neat grid.
 */
const GitHubStats: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/mr-mister007/repos?sort=updated&per_page=6')
      .then((res) => {
        if (!res.ok) throw new Error('API Rate Limit or Network Error');
        return res.json();
      })
      .then((data: Repo[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        } else {
          setRepos(FALLBACK_REPOS);
        }
        setLoading(false);
      })
      .catch(() => {
        setRepos(FALLBACK_REPOS);
        setLoading(false);
      });
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
