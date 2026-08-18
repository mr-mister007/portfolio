import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Entry {
  type: 'input' | 'output' | 'error';
  text: string;
}

const COMMANDS: Record<string, (args: string[]) => string | string[]> = {
  help: () => [
    'Available commands:',
    '  whoami          — who is this?',
    '  ls              — browse directory',
    '  kubectl get pods— list running cluster pods',
    '  terraform plan  — view infrastructure dry-run plan',
    '  helm status     — view release deployments',
    '  docker ps       — list active containers',
    '  cat about.txt   — bio & experience',
    '  skills          — tech stack breakdown',
    '  ./contact.sh    — contact information',
    '  date            — server time',
    '  clear           — clear output',
  ],
  whoami: () => 'Aravind — DevOps & Platform Engineer. I build infrastructure that scales.',
  ls: () => ['skills/  experience/  projects/  infra/  certs/'],
  'kubectl get pods': () => [
    'NAME                             READY   STATUS    RESTARTS   AGE',
    'api-gateway-v2-7f9d86b48-x9q12    1/1     Running   0          4d12h',
    'auth-service-6b889d97d-m2k4p     1/1     Running   0          12d',
    'payment-processor-58c4f9-z89lx   1/1     Running   0          2d6h',
    'prometheus-k8s-0                 3/3     Running   0          18d',
    'argocd-server-5d665796f7-l7w9p   1/1     Running   0          30d',
  ],
  'terraform plan': () => [
    'Terraform used the selected providers to generate the following execution plan:',
    '  + module.eks.aws_eks_cluster.main',
    '  + module.vpc.aws_subnet.private[0..2]',
    '  + module.security.aws_security_group.ingress',
    'Plan: 14 to add, 0 to change, 0 to destroy.',
    'Status: Infrastructure state synced successfully.',
  ],
  'helm status': () => [
    'NAME: prod-ingress-controller',
    'LAST DEPLOYED: Tue Aug 18 14:22:10 2026',
    'NAMESPACE: ingress-nginx',
    'STATUS: deployed',
    'REVISION: 4',
    'TEST SUITE: None',
  ],
  'docker ps': () => [
    'CONTAINER ID   IMAGE                 COMMAND                  PORTS                   NAMES',
    '8f4a12b0e9c1   nginx:alpine          "/docker-entrypoint.…"   0.0.0.0:443->443/tcp    ingress-proxy',
    '3d9f01c2a884   redis:7-alpine        "docker-entrypoint.s…"   0.0.0.0:6379->6379/tcp  cache-cluster',
    '1a92e44f810c   prom/prometheus:v2.45 "/bin/prometheus --…"   0.0.0.0:9090->9090/tcp  telemetry-prom',
  ],
  skills: () => [
    'Languages:     Go, Python, TypeScript, Bash',
    'Orchestration: Kubernetes, Docker, Nomad',
    'Cloud:         AWS, GCP, Azure',
    'CI/CD:         GitHub Actions, ArgoCD, GitLab CI',
    'IaC:           Terraform, Pulumi, AWS CDK, Helm',
    'Observability: Prometheus, Grafana, ELK, Datadog',
    'Platform:      Istio, Envoy, Vault, Consul',
  ],
  'cat about.txt': () => [
    '── about.txt ──────────────────────',
    'DevOps & Platform Engineer with 2+ years',
    'experience designing, building, and running',
    'production infrastructure at scale.',
    '',
    'I believe infrastructure should be boring:',
    'predictable, reliable, and automated so teams',
    'can focus on shipping product.',
    '───────────────────────────────────',
  ],
  './contact.sh': () => [
    '── contact.sh ─────────────────────',
    'Email:    aravind@serververse.qzz.io',
    'GitHub:   github.com/mr-mister007',
    'LinkedIn: linkedin.com/in/aravindmv03',
    '───────────────────────────────────',
  ],
  date: () => new Date().toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  }),
};

/**
 * Interactive in-page terminal widget.
 * Type commands and get responses — like a real shell.
 */
const TerminalWidget: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([
    { type: 'output', text: '── portfolio terminal ─────────────────' },
    { type: 'output', text: 'Type `help` for available commands.' },
    { type: 'output', text: '───────────────────────────────────────' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  // Focus input on mount and on click
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setEntries((prev) => [...prev, { type: 'input', text: `~/portfolio $ ${trimmed}` }]);
    setHistory((prev) => [...prev, trimmed]);
    setHistIdx(-1);

    // Parse command
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    if (cmd === 'clear') {
      setEntries([]);
      setInput('');
      return;
    }

    // Try exact match first, then cmd-based lookup
    const handler = COMMANDS[trimmed] || COMMANDS[cmd];
    if (handler) {
      const result = handler(args);
      const lines = Array.isArray(result) ? result : [result];
      // Typewriter effect — append one line at a time
      let lineIdx = 0;
      const appendNext = () => {
        if (lineIdx >= lines.length) {
          setInput('');
          return;
        }
        setEntries((prev) => [...prev, { type: 'output', text: lines[lineIdx] }]);
        lineIdx++;
        setTimeout(appendNext, 40);
      };
      appendNext();
    } else {
      setEntries((prev) => [...prev, { type: 'error', text: `bash: ${cmd}: command not found` }]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const newIdx = histIdx + 1;
      if (newIdx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(newIdx);
        setInput(history[newIdx]);
      }
    }
  };

  return (
    <div
      className="rounded-xl border border-border bg-surface/50 overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface/30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-text-secondary/60 text-xs font-mono ml-2">terminal — ~/portfolio</span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="p-4 max-h-[320px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed space-y-1"
      >
        <AnimatePresence initial={false}>
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12 }}
              className={
                entry.type === 'input'
                  ? 'text-accent'
                  : entry.type === 'error'
                    ? 'text-red-400'
                    : 'text-text-secondary'
              }
            >
              {entry.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input line */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2.5 border-t border-border bg-surface/20">
        <span className="font-mono text-xs sm:text-sm text-accent shrink-0">~/portfolio $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-text-primary placeholder-text-secondary/30"
          placeholder="type a command..."
          autoComplete="off"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default TerminalWidget;
