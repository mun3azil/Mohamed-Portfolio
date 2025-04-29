"use client";

import { useState } from "react";
import Image from "next/image";

const Portfolio = () => {
  const [projects] = useState([
    {
      title: "مشروع 1",
      description: "وصف قصير للمشروع 1",
      link: "/projects/project-1",
      image: "/assets/images/project-1.jpg",
    },
    {
      title: "مشروع 2",
      description: "وصف قصير للمشروع 2",
      link: "/projects/project-2",
      image: "/assets/images/project-2.jpg",
    },
    {
      title: "مشروع 3",
      description: "وصف قصير للمشروع 3",
      link: "/projects/project-3",
      image: "/assets/images/project-3.jpg",
    },
  ]);

  return (
    <section className="portfolio-section py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">محفظة أعمالي</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="portfolio-item border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={`صورة ${project.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                <p className="text-gray-800 dark:text-gray-100 mt-2">{project.description}</p>
                <a
                  href={project.link}
                  className="text-primary mt-4 inline-block hover:text-accent transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={`عرض تفاصيل ${project.title}`}
                >
                  عرض التفاصيل
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;