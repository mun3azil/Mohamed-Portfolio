import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  demoLink?: string;
  codeLink?: string;
  fullDescription?: string;
}

const ProjectCard = React.memo(({ title, description, image, tags, demoLink, codeLink, fullDescription }: ProjectCardProps) => {
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  // استخدم useCallback لتقليل إعادة إنشاء الدالة
  const handleAddComment = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments(prev => [...prev, comment]);
      setComment('');
    }
  }, [comment]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative h-64 bg-gray-300 dark:bg-gray-700">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary to-secondary opacity-70">
            <span className="text-white text-2xl font-bold">{title}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {fullDescription && (
          <div className="mb-6">
            <h4 className="font-bold text-lg mb-3">تفاصيل المشروع</h4>
            <p className="text-gray-600 dark:text-gray-300">
              {fullDescription}
            </p>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          {demoLink && (
            <Link
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition"
            >
              عرض المشروع
            </Link>
          )}
          {codeLink && (
            <Link
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 border border-primary text-primary rounded-md hover:bg-gray-50 transition dark:hover:bg-gray-700"
            >
              الكود المصدري
            </Link>
          )}
        </div>

        <button
          className="text-primary underline text-sm mb-2"
          onClick={() => setShowComments((v) => !v)}
        >
          {showComments ? 'إخفاء التعليقات' : 'عرض التعليقات أو أضف تعليقك'}
        </button>
        {showComments && (
          <div className="mt-4">
            <form onSubmit={handleAddComment} className="flex gap-2 mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white text-sm"
                placeholder="اكتب تعليقك..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                maxLength={200}
                required
              />
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary text-sm transition">إرسال</button>
            </form>
            <ul className="space-y-1 text-sm">
              {comments.length === 0 && <li className="text-gray-400">لا توجد تعليقات بعد.</li>}
              {comments.map((c, i) => (
                <li key={i} className="bg-gray-100 dark:bg-gray-700 rounded px-3 py-1">{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});

export default ProjectCard;
