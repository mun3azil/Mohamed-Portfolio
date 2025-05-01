export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string; // ISO format: YYYY-MM
  endDate: string | null; // ISO format: YYYY-MM or null for present
  description: string[];
  skills: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string; // ISO format: YYYY-MM
  endDate: string; // ISO format: YYYY-MM
  description: string;
  achievements?: string[];
}

export const workExperience: ExperienceItem[] = [
  {
    id: "exp-1",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "Remote",
    startDate: "2021-06",
    endDate: null, // Present
    description: [
      "Led the development of a complex SPA using React, Next.js, and TypeScript",
      "Implemented responsive designs using Tailwind CSS and Framer Motion",
      "Improved application performance by 40% through code optimization",
      "Mentored junior developers and conducted code reviews"
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://techinnovations.com"
  },
  {
    id: "exp-2",
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    location: "Dubai, UAE",
    startDate: "2019-03",
    endDate: "2021-05",
    description: [
      "Developed and maintained multiple client websites using React and Vue.js",
      "Collaborated with designers to implement pixel-perfect UI components",
      "Integrated RESTful APIs and GraphQL endpoints",
      "Implemented CI/CD pipelines using GitHub Actions"
    ],
    skills: ["React", "Vue.js", "JavaScript", "REST API", "GraphQL"],
    link: "https://digitalsolutions.com"
  },
  {
    id: "exp-3",
    title: "Web Developer",
    company: "Creative Agency",
    location: "Cairo, Egypt",
    startDate: "2017-09",
    endDate: "2019-02",
    description: [
      "Built responsive websites for various clients using HTML, CSS, and JavaScript",
      "Implemented WordPress themes and plugins",
      "Optimized website performance and SEO",
      "Collaborated with the design team to create engaging user experiences"
    ],
    skills: ["HTML", "CSS", "JavaScript", "WordPress", "SEO"],
    link: "https://creativeagency.com"
  }
];

export const education: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Master of Computer Science",
    institution: "Cairo University",
    location: "Cairo, Egypt",
    startDate: "2019-09",
    endDate: "2021-06",
    description: "Specialized in Web Technologies and User Experience Design",
    achievements: [
      "Graduated with honors",
      "Published research paper on modern web frameworks",
      "Received scholarship for academic excellence"
    ]
  },
  {
    id: "edu-2",
    degree: "Bachelor of Computer Science",
    institution: "Alexandria University",
    location: "Alexandria, Egypt",
    startDate: "2015-09",
    endDate: "2019-06",
    description: "Focused on Software Engineering and Web Development",
    achievements: [
      "Graduated with distinction",
      "Developed an award-winning project for university portal",
      "Participated in ACM programming competitions"
    ]
  }
];
