import { AboutPageView } from "@/components/about_page/about-page-view";
import { getAbout } from "@/lib/about-data";
import { buildAcademicTree } from "@/lib/academic";
import { getAcademicLabels } from "@/lib/academic-data";
import { getSkills } from "@/lib/skill-data";
import { getLearning } from "@/lib/learning-data";
import { getExperience } from "@/lib/experience-data";

export default async function AboutPage() {
  const [about, labels, skills, learning, experience] = await Promise.all([
    getAbout(),
    getAcademicLabels(),
    getSkills(),
    getLearning(),
    getExperience(),
  ]);

  return (
    <AboutPageView
      about={about}
      academicRoots={buildAcademicTree(labels)}
      skills={skills}
      learning={learning}
      experience={experience}
    />
  );
}
