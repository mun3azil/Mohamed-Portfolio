import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  title: string;
  description: string;
}

const Hero = ({ title, description }: HeroProps) => {
  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-right">
            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">مرحبًا، أنا</span>
              <span className="gradient-text">{title}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              <Link
                href="/contact"
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-secondary transition duration-300 text-lg font-medium"
                aria-label="تواصل معي"
              >
                تواصل معي
              </Link>
              <Link
                href="/projects"
                className="px-6 py-3 bg-white text-primary border border-primary rounded-md hover:bg-gray-50 transition duration-300 text-lg font-medium dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                aria-label="مشاريعي"
              >
                مشاريعي
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div
              className="w-72 h-72 md:w-96 md:h-96 relative mx-auto rounded-full overflow-hidden border-4 border-primary shadow-xl"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary">
                Mohamed
              </div>
              <Image
                src="/images/profile.jpg"
                alt="Mohamed - Web Developer"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Skills Badges */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full text-white text-xl">
                <span>JS</span>
              </div>
            </div>
            <div className="absolute top-1/4 -right-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-cyan-500 rounded-full text-white text-xl">
                <span>R</span>
              </div>
            </div>
            <div className="absolute -top-4 left-1/4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-500 rounded-full text-white text-xl">
                <span>HTML</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;