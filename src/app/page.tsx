import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import BlogPreview from '@/components/sections/BlogPreview';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <BlogPreview />
      <Contact />
    </div>
  );
}
