import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "C++", level: 92 },
      { name: "C", level: 80 },
      { name: "Python", level: 65 },
      { name: "JavaScript", level: 60 },
    ],
  },
  {
    title: "Core Skills",
    skills: [
      { name: "Data Structures", level: 90 },
      { name: "Algorithms", level: 88 },
      { name: "OOP", level: 85 },
      { name: "Problem Solving", level: 95 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git & GitHub", level: 78 },
      { name: "Linux/Bash", level: 70 },
      { name: "VS Code", level: 85 },
      { name: "Codeforces", level: 88 },
    ],
  },
  {
    title: "Currently Learning",
    skills: [
      { name: "Web Development", level: 50 },
      { name: "System Design", level: 45 },
      { name: "Database Design", level: 40 },
      { name: "Backend APIs", level: 48 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-primary font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-primary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 bg-card/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold mb-3 uppercase tracking-widest">
            Technical Skills
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            My <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-primary rounded-full" />
                {cat.title}
              </h3>
              {cat.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={catIndex * 0.1 + i * 0.1}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
