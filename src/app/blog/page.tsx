import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="max-w-4xl mx-auto px-4">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-3xl mb-8 tracking-tighter">Blogs</h1>
      </BlurFade>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="flex flex-col space-y-3 mb-6 group"
                href={`/blog/${post.slug}`}
              >
                {post.metadata.image && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="w-full flex flex-col">
                  <p className="text-lg font-medium tracking-tight group-hover:text-blue-500 transition-colors">
                    {post.metadata.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.metadata.publishedAt).toLocaleDateString()}
                  </p>
                  {post.metadata.summary && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.metadata.summary}
                    </p>
                  )}
                </div>
              </Link>
            </BlurFade>
          ))}
      </div>
    </section>
  );
}