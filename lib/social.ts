export const SOCIAL_ICON_NAMES = [
  "github",
  "linkedin",
  "mail",
  "twitter",
  "instagram",
  "youtube",
  "globe",
] as const;

export type SocialIconName = (typeof SOCIAL_ICON_NAMES)[number];

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  handle: string;
  icon: SocialIconName;
  sortOrder: number;
};

export const defaultSocialLinks: SocialLink[] = [
  {
    id: "default-github",
    label: "GitHub",
    href: "https://github.com/Gonzalo777ic",
    handle: "@Gonzalo777ic",
    icon: "github",
    sortOrder: 0,
  },
  {
    id: "default-linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gonzalo-isique-bb38261b8",
    handle: "@gonzalo-isique",
    icon: "linkedin",
    sortOrder: 1,
  },
  {
    id: "default-mail",
    label: "Email",
    href: "mailto:gonzaloisiquecastro@gmail.com",
    handle: "gonzaloisiquecastro@gmail.com",
    icon: "mail",
    sortOrder: 2,
  },
];

export function isSocialIconName(value: string): value is SocialIconName {
  return (SOCIAL_ICON_NAMES as readonly string[]).includes(value);
}

export function socialByIcon(socials: SocialLink[], icon: SocialIconName) {
  return socials.find((item) => item.icon === icon);
}

export function emailFromSocials(socials: SocialLink[], fallback: string) {
  const mail = socialByIcon(socials, "mail");
  if (!mail) return fallback;
  const fromHandle = mail.handle.replace(/^mailto:/i, "").trim();
  if (fromHandle.includes("@")) return fromHandle;
  const fromHref = mail.href.replace(/^mailto:/i, "").trim();
  return fromHref || fallback;
}

export function websiteFromSocials(socials: SocialLink[], fallback: string) {
  return socialByIcon(socials, "globe")?.href || fallback;
}

export function normalizeSocialHref(icon: SocialIconName, href: string) {
  const trimmed = href.trim();
  if (icon === "mail") {
    if (trimmed.startsWith("mailto:")) return trimmed;
    return `mailto:${trimmed.replace(/^mailto:/, "")}`;
  }
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("mailto:")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
