import { IconType } from "react-icons";
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaDocker, 
  FaDatabase,
  FaServer,
  FaTools,
  FaCode
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiExpress, 
  SiGraphql, 
  SiMongodb, 
  SiPostgresql 
} from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";

export interface Skill {
  name: string;
  icon: IconType;
  level: number; // 0-100
  yearsOfExperience: number;
  category: string[];
  link?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  titleKey: string;
  icon: IconType;
  skills: Skill[];
}

export const skills: Skill[] = [
  // Frontend
  {
    name: "React.js",
    icon: FaReact,
    level: 90,
    yearsOfExperience: 4,
    category: ["Frontend", "JavaScript"],
    link: "https://reactjs.org"
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    level: 85,
    yearsOfExperience: 3,
    category: ["Frontend", "React"],
    link: "https://nextjs.org"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    level: 80,
    yearsOfExperience: 3,
    category: ["Frontend", "Backend", "JavaScript"],
    link: "https://www.typescriptlang.org"
  },
  {
    name: "JavaScript",
    icon: TbBrandJavascript,
    level: 95,
    yearsOfExperience: 5,
    category: ["Frontend", "Backend"],
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    level: 90,
    yearsOfExperience: 3,
    category: ["Frontend", "CSS"],
    link: "https://tailwindcss.com"
  },
  
  // Backend
  {
    name: "Node.js",
    icon: FaNodeJs,
    level: 85,
    yearsOfExperience: 4,
    category: ["Backend", "JavaScript"],
    link: "https://nodejs.org"
  },
  {
    name: "Express.js",
    icon: SiExpress,
    level: 80,
    yearsOfExperience: 4,
    category: ["Backend", "Node.js"],
    link: "https://expressjs.com"
  },
  {
    name: "GraphQL",
    icon: SiGraphql,
    level: 75,
    yearsOfExperience: 2,
    category: ["Backend", "API"],
    link: "https://graphql.org"
  },
  
  // Tools & Technologies
  {
    name: "Git",
    icon: FaGitAlt,
    level: 90,
    yearsOfExperience: 5,
    category: ["Tools", "Version Control"],
    link: "https://git-scm.com"
  },
  {
    name: "Docker",
    icon: FaDocker,
    level: 70,
    yearsOfExperience: 2,
    category: ["Tools", "DevOps"],
    link: "https://www.docker.com"
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    level: 80,
    yearsOfExperience: 3,
    category: ["Database", "NoSQL"],
    link: "https://www.mongodb.com"
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    level: 75,
    yearsOfExperience: 3,
    category: ["Database", "SQL"],
    link: "https://www.postgresql.org"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    titleKey: "skillsFrontend",
    icon: FaCode,
    skills: skills.filter(skill => skill.category.includes("Frontend"))
  },
  {
    id: "backend",
    title: "Backend Development",
    titleKey: "skillsBackend",
    icon: FaServer,
    skills: skills.filter(skill => skill.category.includes("Backend"))
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    titleKey: "skillsTools",
    icon: FaTools,
    skills: skills.filter(skill => 
      skill.category.includes("Tools") || 
      skill.category.includes("Database") || 
      skill.category.includes("DevOps")
    )
  }
];
