import { FaCode, FaServer, FaTools } from "react-icons/fa";
import { IconType } from "react-icons";

export const iconMap: Record<string, IconType> = {
  FaCode,
  FaServer,
  FaTools,
};

export const skillsData = [
  // Frontend
  {
    name: "React.js",
    icon: "FaCode",
    level: 90,
    yearsOfExperience: 3,
    link: "https://www.reactjs.org", // رابط للمزيد من المعلومات أو شهادة
    category: ["Frontend", "JavaScript"], // التصنيف الفرعي
  },
  {
    name: "Next.js",
    icon: "FaCode",
    level: 85,
    yearsOfExperience: 2,
    link: "https://www.nextjs.org",
    category: ["Frontend", "React"],
  },
  {
    name: "Tailwind CSS",
    icon: "FaCode",
    level: 95,
    yearsOfExperience: 3,
    link: "https://www.tailwindcss.com",
    category: ["Frontend", "CSS"],
  },
  {
    name: "TypeScript",
    icon: "FaCode",
    level: 80,
    yearsOfExperience: 2,
    link: "https://www.typescriptlang.org",
    category: ["Frontend", "JavaScript"],
  },
  {
    name: "HTML/CSS",
    icon: "FaCode",
    level: 100,
    yearsOfExperience: 4,
    category: ["Frontend"],
  },

  // Backend
  {
    name: "Node.js",
    icon: "FaServer",
    level: 90,
    yearsOfExperience: 3,
    link: "https://www.nodejs.org",
    category: ["Backend"],
  },
  {
    name: "Express.js",
    icon: "FaServer",
    level: 85,
    yearsOfExperience: 2,
    category: ["Backend"],
  },
  {
    name: "RESTful APIs",
    icon: "FaServer",
    level: 95,
    yearsOfExperience: 3,
    category: ["Backend"],
  },
  {
    name: "GraphQL",
    icon: "FaServer",
    level: 70,
    yearsOfExperience: 1,
    category: ["Backend"],
  },

  // Tools & Others
  {
    name: "Git",
    icon: "FaTools",
    level: 95,
    yearsOfExperience: 4,
    category: ["Tools"],
  },
  {
    name: "MongoDB",
    icon: "FaTools",
    level: 80,
    yearsOfExperience: 2,
    category: ["Tools", "Database"],
  },
  {
    name: "PostgreSQL",
    icon: "FaTools",
    level: 85,
    yearsOfExperience: 2,
    category: ["Tools", "Database"],
  },
  {
    name: "Docker",
    icon: "FaTools",
    level: 75,
    yearsOfExperience: 1,
    category: ["Tools", "DevOps"],
  },
];
