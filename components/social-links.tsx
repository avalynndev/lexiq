import { Button } from "@/components/ui/button";
import { Github, Youtube } from "lucide-react";

export function SocialLinks() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/avalynndev",
      icon: Github,
    },
    {
      name: "X",
      href: "https://twitter.com/avalynndev",
      icon: null,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@avalynndev",
      icon: Youtube,
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {socialLinks.map((link) => {
        return (
          <Button
            key={link.name}
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8"
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
            >
              {link.name === "X" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 1200 1227"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                link.icon && <link.icon className="w-5 h-5" />
              )}
            </a>
          </Button>
        );
      })}
    </div>
  );
}
