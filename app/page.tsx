import { HomeHero } from "@/components/home/home-hero";
import { HomeSkills } from "@/components/home-skills";
import { AboutSection } from "@/components/about-section";
import { CuratedWork } from "@/components/curated-work";
import { ServicesSection } from "@/components/services-section";
import { ValuesMarquee } from "@/components/values-marquee";
import { PersonalFavorites } from "@/components/personal-favorites";
import { CtaSection } from "@/components/cta-section";
import { getShowcase } from "@/lib/showcase";
import { getAbout } from "@/lib/about-data";
import { getSocialLinks } from "@/lib/social-data";
import { getServices } from "@/lib/service-data";
import { getSkillGroups } from "@/lib/skill-data";
import { getFeaturedProjects } from "@/lib/project-data";
import { getMarqueeWords } from "@/lib/marquee-data";
import { getAlbums } from "@/lib/album-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    showcase,
    about,
    socials,
    services,
    skillGroups,
    featuredProjects,
    marqueeWords,
    albums,
  ] = await Promise.all([
    getShowcase(),
    getAbout(),
    getSocialLinks(),
    getServices(),
    getSkillGroups(),
    getFeaturedProjects(),
    getMarqueeWords(),
    getAlbums(),
  ]);

  return (
    <div className="flex flex-col w-full">
      <HomeHero showcase={showcase} />
      <AboutSection about={about} socials={socials} />
      <ServicesSection services={services} />
      <div className="w-full overflow-hidden">
        <HomeSkills groups={skillGroups} />
      </div>
      <CuratedWork projects={featuredProjects} />
      <ValuesMarquee words={marqueeWords} />
      <PersonalFavorites albums={albums} />
      <CtaSection />
    </div>
  );
}
