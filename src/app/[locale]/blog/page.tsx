
import { BlogPostList } from '@/features/blog/BlogPostList';
import { BlogConversionCta } from '@/features/blog/BlogConversionCta';

export default function BlogPage() {
  return (
    <main>
      <BlogPostList />
      <BlogConversionCta />
    </main>
  );
}
