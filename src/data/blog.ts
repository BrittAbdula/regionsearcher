import { prisma } from '@/prisma';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkImages from 'remark-images';
import rehypeSanitize from 'rehype-sanitize';
import remarkToc from 'remark-toc';
import { Options as RemarkImagesOptions } from 'remark-images';
import { unified } from 'unified';
import path from 'path';
import fs from 'fs';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string | null;
};
const imageOptions = {
  className: 'custom-image',
  widthAttribute: true,
  heightAttribute: true,
};

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse) // 将 markdown 转换为 markdown AST
    .use(remarkRehype) // 转换为 HTML AST
    .use(rehypeSanitize) // HTML 消毒，处理不安全的内容，防止 XSS 攻击
    .use(rehypeStringify) // 将 AST 转换为 HTML
    .use(remarkToc)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  const post = await prisma.blogContent.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    throw new Error(`Post with slug "${slug}" not found.`);
  }

  const { title, publishedAt, summary, image, content, contentHtml } = post;
  const metadata = { title, publishedAt: publishedAt.toISOString(), summary, image };

  let html;
  if (contentHtml) {
    // 如果已经有处理过的HTML，直接使用
    html = contentHtml;
  } else {
    // 否则，转换Markdown为HTML
    html = await markdownToHTML(content);

    // 可选：将转换后的HTML保存到数据库，以便将来使用
    await prisma.blogContent.update({
      where: { slug },
      data: { contentHtml: html }
    });
  }

  return {
    metadata,
    slug,
    source: html,
  };
}

export async function getBlogPosts() {
  const posts = await prisma.blogContent.findMany({
    select: {
      slug: true,
      title: true,
      publishedAt: true,
      summary: true,
      image: true,
      contentHtml: true,
    },
  });

  return posts.map(({ slug, title, publishedAt, summary, image, contentHtml }) => {
    const metadata = { title, publishedAt: publishedAt.toISOString(), summary, image };

    const htmlPreview = contentHtml ? contentHtml.slice(0, 200) + (contentHtml.length > 200 ? '...' : '') : '';

    return {
      metadata,
      slug,
      source: htmlPreview,
    };
  });
};

export async function createBlogPost(
  title: string,
  content: string,
  summary: string,
  image?: string
) {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  const htmlContent = await markdownToHTML(content);

  const newPost = await prisma.blogContent.create({
    data: {
      title,
      slug,
      content,
      contentHtml: htmlContent,
      summary,
      image,
      publishedAt: new Date(),
    },
  });

  return newPost;
}