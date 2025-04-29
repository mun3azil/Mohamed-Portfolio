import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { IconType } from "react-icons";
import React from 'react';

export interface Skill {
  name: string;
  icon: IconType;
  level: number;
  yearsOfExperience: number;
  link?: string;
  category: string[];
}

export const skillsData: Skill[] = [
  {
    name: "JavaScript",
    icon: FaStar,
    level: 80,
    yearsOfExperience: 5,
    link: "https://example.com",
    category: ["Frontend", "Programming"],
  },
  {
    name: "React",
    icon: FaStar,
    level: 90,
    yearsOfExperience: 4,
    link: "https://example.com",
    category: ["Frontend", "UI Framework"],
  },
];

const SkillsSection: FC = React.memo(() => {
  return (
    <section className="skills-section py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">
          المهارات
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {skillsData.map((skill: Skill) => (
            <div
              key={skill.name}
              className="skill-card p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              role="article"
              aria-label={`مهارة ${skill.name}`}
            >
              <div className="flex items-center mb-4">
                <skill.icon className="text-4xl text-primary dark:text-accent" />
                <h3 className="text-xl font-semibold ml-4 text-primary">{skill.name}</h3>
              </div>
              <div className="text-gray-800 dark:text-gray-100">
                <p>مستوى المهارة: {skill.level}%</p>
                <p>سنوات الخبرة: {skill.yearsOfExperience} سنة</p>
                {skill.link && (
                  <a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary dark:text-accent hover:underline mt-2 block transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent"
                    aria-label={`رابط أو شهادة لمهارة ${skill.name}`}
                  >
                    شهادة أو رابط
                  </a>
                )}
              </div>
              {/* عرض التصنيف */}
              <div className="mt-4 text-sm">
                <p>التصنيف:</p>
                <ul className="list-disc pl-4 text-gray-500 dark:text-gray-400">
                  {skill.category.map((cat: string) => (
                    <li key={cat}>{cat}</li>
                  ))}
                </ul>
              </div>
              {/* عرض النجوم بناءً على المستوى */}
              <div className="mt-4">
                <p className="mb-2">تقييم المهارة:</p>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-yellow-500 ${
                        index < skill.level / 20 ? "fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default SkillsSection;
