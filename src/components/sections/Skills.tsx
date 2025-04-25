import React from 'react';

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

interface SkillGroupProps {
  icon: React.ReactNode;
  title: string;
  skills: Skill[];
}

const SkillBar: React.FC<Skill> = ({ name, percentage, color }) => {
  return (
    <div className="mb-6" dir="rtl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div
        className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Number(percentage)}
        aria-label={`${name} progress`}
      >
        <div
          className={`h-full rounded-full ${color} progress-bar`}
          data-width={percentage}
        ></div>
      </div>
    </div>
  );
};

const SkillGroup: React.FC<SkillGroupProps> = ({ icon, title, skills }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="flex items-center mb-6">
        <div className="text-3xl text-primary mr-4">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div>
        {skills.map((skill, index) => (
          <SkillBar
            key={`${skill.name}-${index}`}
            name={skill.name}
            percentage={skill.percentage}
            color={skill.color}
          />
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const skillGroups: SkillGroupProps[] = [
    {
      title: 'لغات البرمجة',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      skills: [
        { name: 'HTML', percentage: 95, color: 'bg-orange-500' },
        { name: 'CSS', percentage: 90, color: 'bg-blue-500' },
        { name: 'JavaScript', percentage: 85, color: 'bg-yellow-500' },
        { name: 'Python', percentage: 75, color: 'bg-green-500' },
      ],
    },
    {
      title: 'أطر العمل',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      skills: [
        { name: 'React', percentage: 90, color: 'bg-cyan-500' },
        { name: 'Next.js', percentage: 85, color: 'bg-gray-800' },
        { name: 'Node.js', percentage: 80, color: 'bg-green-600' },
        { name: 'Express', percentage: 75, color: 'bg-gray-600' },
        { name: 'Django', percentage: 70, color: 'bg-green-800' },
      ],
    },
    {
      title: 'أدوات التصميم',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      skills: [
        { name: 'Figma', percentage: 85, color: 'bg-purple-500' },
        { name: 'Adobe XD', percentage: 80, color: 'bg-pink-600' },
        { name: 'Photoshop', percentage: 75, color: 'bg-blue-800' },
        { name: 'Illustrator', percentage: 70, color: 'bg-orange-600' },
      ],
    },
    {
      title: 'أدوات أخرى',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      skills: [
        { name: 'Git/GitHub', percentage: 90, color: 'bg-gray-700' },
        { name: 'SEO', percentage: 85, color: 'bg-red-500' },
        { name: 'Responsive Design', percentage: 95, color: 'bg-indigo-500' },
        { name: 'Performance Optimization', percentage: 80, color: 'bg-green-500' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-16 bg-gray-100 dark:bg-gray-900" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">مهاراتي</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            مجموعة من المهارات التقنية والأدوات التي أتقنها وأستخدمها في تطوير مشاريعي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, index) => (
            <SkillGroup
              key={`${group.title}-${index}`}
              title={group.title}
              icon={group.icon}
              skills={group.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;