export type NavItem = {
  key?: 'home' | 'projects' | 'skills' | 'about' | 'contact' | 'blog';
  label?: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: NavItem;
  trustSignal: string;
  avatar: {
    src: string;
    alt: string;
  };
};

export type CaseStudySection = {
  title: string;
  body: string;
};

export type CaseStudy = {
  problem: CaseStudySection;
  solution: CaseStudySection;
  techDecisions: string[];
  measurableOutcome: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  links: {
    live: string;
    source: string;
  };
  featured?: boolean;
  caseStudy: CaseStudy;
};

export type Skill = {
  name: string;
  level: string;
};

export type AboutContent = {
  title: string;
  description: string;
  highlights: string[];
};

export type ContactContent = {
  title: string;
  description: string;
  email: string;
  location: string;
  responseExpectation: string;
  projectTypes: string[];
  budgetRanges: string[];
  timelineOptions: string[];
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type BlogPost = BlogPostMeta & {
  content: string;
};
