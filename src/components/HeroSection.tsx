import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Code2, MapPin, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import istiyakPhoto from "@/assets/istiyak-photo.jpeg";

const phrases = [
  "I build logic.",
  "I solve problems.",
  "I design systems.",
];

const HeroSection = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(phrase.slice(0, displayText.length + 1));
          if (displayText.length === phrase.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(phrase.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">
                Available for Opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              Aspiring Software
              <br />
              Engineer from{" "}
              <span className="text-gradient">Bangladesh</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-8 h-10"
            >
              <span>{displayText}</span>
              <span className="border-r-2 border-primary animate-typing-cursor ml-0.5">
                &nbsp;
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-10 text-sm text-muted-foreground"
            >
              <MapPin size={16} className="text-primary" />
              <span>Bangladesh</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <a
                href="#contact"
                className="bg-gradient-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-base hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                Contact Me
              </a>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Istiyak-Raz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://codeforces.com/profile/Istiyak_Raz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Code2 size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/istiyak-raz-998670380/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right side - photo + name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col items-end gap-6"
          >
            <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
              <img
                src={istiyakPhoto}
                alt="Istiyak Raz"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h2 className="font-display text-6xl xl:text-7xl font-extrabold leading-none text-foreground/5 select-none">
              Istiyak Raz
            </h2>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
