"use client";

import { Facebook, Linkedin } from "lucide-react";
import TikTokIcon from "./icons/TikTokIcon";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100092532836984",
    icon: Facebook,
  },
  {
    name: "TikTok",
    href: "https://vm.tiktok.com/ZS9rPe1MkRv7e-y014q/",
    icon: TikTokIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/fomico-industries/",
    icon: Linkedin,
  },
  {
    // TODO: replace "#" with the WhatsApp community invite link once available.
    name: "WhatsApp",
    href: "#",
    icon: WhatsAppIcon,
    pending: true,
  },
];

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md";
}

const SIZE_CLASSES = {
  sm: { button: "w-8 h-8", icon: "w-3.5 h-3.5" },
  md: { button: "w-9 h-9", icon: "w-4 h-4" },
};

export default function SocialLinks({ className = "", size = "md" }: SocialLinksProps) {
  const { button, icon } = SIZE_CLASSES[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.href}
            target={social.pending ? undefined : "_blank"}
            rel={social.pending ? undefined : "noopener noreferrer"}
            aria-label={social.pending ? `${social.name} (bientôt disponible)` : social.name}
            title={social.pending ? `${social.name} — communauté bientôt disponible` : social.name}
            onClick={social.pending ? (e) => e.preventDefault() : undefined}
            className={`${button} rounded-full bg-white/10 flex items-center justify-center transition-all hover:bg-fomico-orange hover:-translate-y-0.5 ${
              social.pending ? "opacity-50 cursor-not-allowed hover:bg-white/10 hover:translate-y-0" : ""
            }`}
          >
            <Icon className={icon} />
          </a>
        );
      })}
    </div>
  );
}
