import { ContactView } from "@/components/contact/contact-view";
import { getAbout } from "@/lib/about-data";
import { getFooterContent } from "@/lib/footer-data";
import { getSocialLinks } from "@/lib/social-data";
import { emailFromSocials, websiteFromSocials } from "@/lib/social";
import { siteConfig } from "@/lib/site-config";

export default async function ContactPage() {
  const [socials, footer, about] = await Promise.all([
    getSocialLinks(),
    getFooterContent(),
    getAbout(),
  ]);

  return (
    <ContactView
      socials={socials}
      photoUrl={footer.photoUrl}
      name={siteConfig.name}
      roles={about.roleTags}
      website={websiteFromSocials(socials, siteConfig.links.website)}
      email={emailFromSocials(socials, siteConfig.links.email)}
    />
  );
}
