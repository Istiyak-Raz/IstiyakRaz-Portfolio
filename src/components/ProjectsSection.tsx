import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Competitive Programming Tracker",
    description:
      "A tool to track competitive programming progress across platforms like Codeforces, with analytics on problems solved, ratings, and topics mastered.",
    tech: ["C++", "Python", "API Integration"],
    github: "#",
    live: "#",
  },
  {
    title: "Algorithm Visualizer",
    description:
      "Interactive web app that visualizes sorting algorithms, graph traversals, and pathfinding algorithms with step-by-step animation.",
    tech: ["JavaScript", "HTML/CSS", "Canvas API"],
    github: "#",
    live: "#",
  },
  {
    title: "CLI Task Manager",
    description:
      "A command-line task management tool built in C++ featuring file I/O, priority queues, and persistent storage for productivity workflows.",
    tech: ["C++", "File I/O", "Data Structures"],
    github: "#",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4"
        >
          <div>
            <p className="text-primary text-sm font-semibold mb-3 uppercase tracking-widest">
              Portfolio
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <a
            href="https://github.com/Istiyak-Raz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center gap-1"
          >
            View all on GitHub <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all hover:shadow-glow flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="font-display text-primary font-bold text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
