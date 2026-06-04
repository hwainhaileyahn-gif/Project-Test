export const dynamic = 'force-dynamic'

import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import JobListings from "@/components/sections/JobListings";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Resume />
      <Contact />
      <JobListings />
    </>
  );
}
