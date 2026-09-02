import { ContactView } from "@/components/contact/contact-view";
import { getAbout } from "@/lib/about-data";
import { getFooterContent } from "@/lib/footer-data";
import { getPhoneNumbers } from "@/lib/phone-data";
import { getSocialLinks } from "@/lib/social-data";
import { emailFromSocials, websiteFromSocials } from "@/lib/social";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [socials, footer, about, phones] = await Promise.all([
    getSocialLinks(),
    getFooterContent(),
    getAbout(),
    getPhoneNumbers(),
  ]);

  return (
    <ContactView
      socials={socials}
      phones={phones}
      photoUrl={footer.photoUrl}
      name={siteConfig.name}
      roles={about.roleTags}
      website={websiteFromSocials(socials, siteConfig.links.website)}
      email={emailFromSocials(socials, siteConfig.links.email)}
    />
  );
}
