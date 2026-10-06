import { Hero } from "@/components/hero/Hero";
import { publicAssetExists } from "@/lib/assets";
import { ASSETS } from "@/lib/constants";
import { About } from "@/components/about/About";
import { TechStack } from "@/components/tech-stack/TechStack";
import { Experience } from "@/components/experience/Experience";
import { Education } from "@/components/education/Education";
import { Projects } from "@/components/projects/Projects";
import { EditorialStatement } from "@/components/editorial/EditorialStatement";
import { Architecture } from "@/components/architecture/Architecture";
import { Resume } from "@/components/resume/Resume";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  const hasPortrait = publicAssetExists(ASSETS.portrait);

  return (
    <>
      <Hero hasPortrait={hasPortrait} />
      <About />
      <TechStack />
      <Experience />
      <Education />
      <Projects />
      <EditorialStatement />
      <Architecture />
      <Resume />
      <Contact />
    </>
  );
}
