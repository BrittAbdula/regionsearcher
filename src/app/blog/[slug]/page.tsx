import { getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import '@/app/blog/blog.css';

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog" className="blog-container max-w-3xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      {post.metadata.image && (
        <div className="blog-image-container mb-8">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <h1 className="blog-title text-4xl font-bold mb-4">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mb-8 text-sm text-gray-600 dark:text-gray-400">
        <Suspense fallback={<p className="h-5" />}>
          <p className="blog-date">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
      </div>
      {post.metadata.summary && (
        <p className="blog-summary text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
          {post.metadata.summary}
        </p>
      )}
      <article
        className="blog-content prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </section>
  );
}