import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Entry {
  type: 'input' | 'output' | 'error';
  text: string;
}

const COMMANDS: Record<string, (args: string[]) => string | string[]> = {
  help: () => [
    'Available commands:',
    '  whoami           — who is this?',
    '  skills           — view full tech stack',
    '  kubectl get pods — inspect cluster workload',
    '  kubectl get nodes— inspect cluster nodes',
    '  terraform plan   — preview infrastructure diff',
    '  docker ps        — inspect active containers',
    '  curl healthz     — probe service health',
    '  ./contact.sh     — get in touch',
    '  date             — current server time',
    '  clear            — clear output',
  ],
  whoami: () => 'Aravind — DevOps & Platform Engineer. Architecting cloud platforms, Kubernetes clusters, and resilient CI/CD pipelines.',
  ls: () => ['about.txt  experience/  projects/  certs/  contact.sh'],
  skills: () => [
    'Cloud:         AWS (EKS, VPC, IAM, RDS, S3), GCP, Azure',
    'Containers:    Kubernetes, Docker, Helm, ArgoCD, Containerd',
    'IaC:           Terraform, Pulumi, Terragrunt, AWS CDK',
    'CI/CD:         GitHub Actions, GitLab CI, Argo Workflows',
    'Observability: Prometheus, Grafana, OpenTelemetry, Datadog',
    'Languages:     Go, Python, TypeScript, Bash / Shell',
    'Platform:      Istio Service Mesh, HashiCorp Vault, Envoy',
  ],
  'cat about.txt': () => [
    '── about.txt ──────────────────────────────────────',
    'DevOps & Platform Engineer with 2+ years experience',
    'designing, building, and running production cloud',
    'infrastructure at scale.',
    '',
    'Philosophy: Build boring, automated infrastructure',
    'so engineering teams can ship features with confidence.',
    '───────────────────────────────────────────────────',
  ],
  'kubectl get pods': () => [
    'NAMESPACE     NAME                           READY   STATUS    RESTARTS   AGE',
    'kube-system   coredns-7c65d6cfc9-5j8kx       1/1     Running   0          42d',
    'kube-system   aws-node-4k8xm                 1/1     Running   0          42d',
    'argocd        argocd-server-6789b5894b-ql9wx 1/1     Running   0          18d',
    'production    gateway-api-795b874cb9-z8g7j   2/2     Running   0          6d',
    'production    auth-service-586b69cf64-pxw7z  1/1     Running   0          12d',
    'monitoring    prometheus-k8s-0               2/2     Running   0          24d',
  ],
  'kubectl get nodes': () => [
    'NAME                                        STATUS   ROLES    AGE   VERSION',
    'ip-10-0-1-142.us-east-1.compute.internal   Ready    <none>   42d   v1.30.2-eks',
    'ip-10-0-1-189.us-east-1.compute.internal   Ready    <none>   42d   v1.30.2-eks',
    'ip-10-0-2-45.us-east-1.compute.internal    Ready    <none>   42d   v1.30.2-eks',
  ],
  kubectl: (args) => {
    if (args.includes('nodes')) {
      return COMMANDS['kubectl get nodes']([]);
    }
    return COMMANDS['kubectl get pods']([]);
  },
  'terraform plan': () => [
    'Terraform used the selected providers to generate the execution plan:',
    '  + module.eks_cluster.aws_eks_node_group.spot_workers',
    '  ~ module.monitoring.helm_release.grafana (v7.3.0 => v8.0.1)',
    '',
    'Plan: 1 to add, 1 to change, 0 to destroy.',
    '✨ Infrastructure state synced perfectly with Git repository.',
  ],
  terraform: () => COMMANDS['terraform plan']([]),
  'docker ps': () => [
    'CONTAINER ID   IMAGE                 COMMAND                  STATUS        PORTS',
    'a8f9c1042e12   traefik:v3.1          "/entrypoint.sh --api"   Up 14 days    0.0.0.0:443->443/tcp',
    'b7e2d9319c50   argocd:v2.11          "/usr/local/bin/argocd"  Up 18 days    0.0.0.0:8080->8080/tcp',
    'c5a1f802d348   grafana/grafana:11.0  "/run.sh"                Up 24 days    0.0.0.0:3000->3000/tcp',
  ],
  docker: () => COMMANDS['docker ps']([]),
  curl: () => [
    'HTTP/2 200 OK',
    `date: ${new Date().toUTCString()}`,
    'server: cloudflare',
    'content-type: application/json',
    '',
    '{"status":"healthy","uptime":"99.98%","service":"portfolio","region":"us-east-1"}',
  ],
  './contact.sh': () => [
    '── contact.sh ─────────────────────────────────────',
    'Email:    hello@aravindmv.com',
    'GitHub:   github.com/mr-mister007',
    'LinkedIn: linkedin.com/in/aravindmv03',
    '───────────────────────────────────────────────────',
  ],
  contact: () => COMMANDS['./contact.sh']([]),
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim();
      if (!current) return;
      const allCmds = Object.keys(COMMANDS);
      const match = allCmds.find((c) => c.startsWith(current));
      if (match) {
        setInput(match);
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
