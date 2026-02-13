import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const GITHUB_USERNAME = "Istiyak-Raz";

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface UserStats {
  public_repos: number;
}

const codeElements = ["{}", "</>", "0x1", "0b10", "const", "=>", "async", "import"];

const AnimatedCounter = ({
  value,
  duration = 1500,
  isInView,
}: {
  value: number;
  duration?: number;
  isInView: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [value, duration, isInView]);

  return <span>{displayValue}</span>;
};

const GitHubOverview = () => {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const [repos, setRepos] = useState<Repo[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [topLanguages, setTopLanguages] = useState<{ name: string; count: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("Failed to fetch GitHub data");

        const userData: UserStats = await userRes.json();
        const reposData: Repo[] = await reposRes.json();

        setUserStats(userData);

        const pinned = reposData.slice(0, 6);
        setRepos(pinned);

        const langMap: Record<string, { count: number; color: string }> = {};
        const langColors: Record<string, string> = {
          TypeScript: "#3178c6",
          JavaScript: "#f1e05a",
          Python: "#3572A5",
          "C++": "#f34b7d",
          C: "#555555",
          HTML: "#e34c26",
          CSS: "#563d7c",
          Java: "#b07219",
          Go: "#00ADD8",
          Rust: "#dea584",
        };

        reposData.forEach((r) => {
          if (r.language) {
            if (!langMap[r.language]) {
              langMap[r.language] = { count: 0, color: langColors[r.language] || "#6e7681" };
            }
            langMap[r.language].count += 1;
          }
        });

        const sorted = Object.entries(langMap)
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 5)
          .map(([name, { count, color }]) => ({ name, count, color }));

        setTopLanguages(sorted);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHub();
  }, []);

  const maxLangCount = topLanguages[0]?.count ?? 1;

  return (
    <section
      id="github"
      ref={ref}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Animated gradient section divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary)/0.6), hsl(var(--primary)), hsl(var(--primary)/0.6), transparent)",
          backgroundSize: "200% 100%",
          animation: "gradient-shift 4s ease infinite",
        }}
      />
      {/* Floating code elements background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
        {codeElements.map((el, i) => (
          <motion.span
            key={i}
            className="absolute text-muted-foreground/10 font-mono text-sm lg:text-base"
            style={{
              left: `${10 + (i * 13) % 80}%`,
              top: `${5 + (i * 17) % 90}%`,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {el}
          </motion.span>
        ))}
      </div>

      {/* Glowing border container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-xl shadow-2xl shadow-primary/5 p-8 md:p-12 lg:p-16"
        style={{
          boxShadow:
            "0 0 0 1px hsl(var(--primary)/0.1), 0 0 60px -15px hsl(var(--primary)/0.2), inset 0 1px 0 hsl(var(--card))",
        }}
      >
        {/* Animated gradient border glow */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-40 -z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary)/0.3), transparent, hsl(var(--primary)/0.3), transparent)",
            backgroundSize: "400% 100%",
            animation: "gradient-shift 8s ease infinite",
          }}
        />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold mb-3 uppercase tracking-widest">
            Open Source & Activity
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            GitHub <span className="text-gradient">Overview</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            My Open Source Work & Coding Activity
          </p>
          <motion.div
            className="h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        {/* Pinned Repositories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-secondary/50 animate-pulse border border-border"
              />
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {error}
            </div>
          ) : (
            repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group relative block rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: "0 4px 24px -4px hsl(0 0% 0% / 0.08)",
                }}
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors truncate pr-2">
                      {repo.name}
                    </h3>
                    <Github size={18} className="text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              repo.language === "TypeScript"
                                ? "#3178c6"
                                : repo.language === "C++"
                                  ? "#f34b7d"
                                  : "#6e7681",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={12} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} />
                      {repo.forks_count}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/80 mb-4">
                    Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View on GitHub <ExternalLink size={14} />
                  </span>
                </div>
              </motion.a>
            ))
          )}
        </motion.div>

        {/* GitHub Stats Overview */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center hover:border-primary/30 hover:shadow-glow transition-all duration-300">
              <Code2 className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl sm:text-3xl font-bold font-display">
                <AnimatedCounter
                  value={userStats?.public_repos ?? 0}
                  isInView={isStatsInView}
                />
              </p>
              <p className="text-sm text-muted-foreground">Repositories</p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 hover:border-primary/30 transition-all duration-300 overflow-hidden block"
            >
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&background=00000000`}
                alt="GitHub streak"
                className="w-full h-auto"
              />
            </a>
          </div>
        </motion.div>

        {/* Top Languages */}
        {topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Top Languages</h3>
            <div className="space-y-3">
              {topLanguages.map((lang, i) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24">{lang.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isStatsInView ? { width: `${(lang.count / maxLangCount) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">{lang.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contribution Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-xl border border-border bg-card/30 backdrop-blur-sm p-6 overflow-hidden"
        >
          <h3 className="font-display font-semibold text-lg mb-4">
            Contribution Activity
          </h3>
          <div
            className="rounded-lg overflow-hidden bg-secondary/30 p-4"
            style={{
              boxShadow: "inset 0 0 30px -10px hsl(var(--primary)/0.1)",
            }}
          >
            <img
              src={`https://ghchart.rshah.org/f97316/${GITHUB_USERNAME}`}
              alt="GitHub contribution chart"
              className="w-full h-auto max-w-full"
            />
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=overview`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View full profile on GitHub <ExternalLink size={14} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GitHubOverview;
