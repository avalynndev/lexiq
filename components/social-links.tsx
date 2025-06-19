import { Button } from '@/components/ui/button';
import { Github, Twitter, Linkedin, Youtube } from 'lucide-react';

export function SocialLinks() {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/lexiq',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/lexiq',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/lexiq',
      icon: Linkedin,
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@lexiq',
      icon: Youtube,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((link) => {
        const IconComponent = link.icon;
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
              <IconComponent className="h-4 w-4" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}