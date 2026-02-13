import { Github, Linkedin, Code2, Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 px-6">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>© 2026 Istiyak Raz. Built with</span>
        <Heart size={14} className="text-primary fill-primary" />
      </div>
      <div className="flex items-center gap-4">
        {[
          { icon: Github, href: "https://github.com/Istiyak-Raz" },
          { icon: Code2, href: "https://codeforces.com/profile/Istiyak_Raz" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/istiyak-raz-998670380/" },
        ].map(({ icon: Icon, href }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
