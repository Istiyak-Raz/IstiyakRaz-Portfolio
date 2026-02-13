import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Brain, Rocket } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm font-semibold mb-3 uppercase tracking-widest">
              About Me
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Crafting Logic &{" "}
              <span className="text-gradient">Elegant Solutions</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm Istiyak Raz — an aspiring software engineer from Bangladesh with a deep love for
              problem-solving, clean code, and building systems that matter. My journey began with
              curiosity about how things work under the hood, which led me to C++ and the world
              of competitive programming.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I focus on writing efficient, well-structured code and constantly push myself through
              algorithmic challenges on platforms like Codeforces. Beyond competitions, I'm building
              real-world skills in backend development, system design, and software architecture — 
              preparing to contribute meaningfully to the tech industry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6"
          >
            {[
              {
                icon: Terminal,
                title: "C++ & Competitive Programming",
                desc: "Deep expertise in C++ with a strong foundation in data structures, algorithms, and problem solving through competitive programming.",
              },
              {
                icon: Brain,
                title: "Backend Development",
                desc: "Building robust server-side applications, REST APIs, and exploring system design patterns for scalable architectures.",
              },
              {
                icon: Rocket,
                title: "Continuous Growth",
                desc: "Currently diving into advanced algorithms, web development frameworks, and software engineering best practices.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <item.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
