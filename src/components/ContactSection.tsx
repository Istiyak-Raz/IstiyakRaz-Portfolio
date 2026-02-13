import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Github, Linkedin, Code2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      toast({
        title: "Setup required",
        description: "Add VITE_FORMSPREE_ENDPOINT to your .env file. See README.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
    };
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-card/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm font-semibold mb-3 uppercase tracking-widest">
              Contact
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Let's Create Something{" "}
              <span className="text-gradient">Exceptional</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Whether you have an opportunity, a project idea, or just want to connect — 
              I'd love to hear from you. Let's collaborate and build something remarkable.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <span>istiyak.ju.cse@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/Istiyak-Raz", label: "GitHub" },
                { icon: Code2, href: "https://codeforces.com/profile/Istiyak_Raz", label: "Codeforces" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/istiyak-raz-998670380/", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                required
                maxLength={1000}
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                placeholder="Tell me about your idea..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
