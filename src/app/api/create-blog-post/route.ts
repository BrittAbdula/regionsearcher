import { NextResponse } from 'next/server';
import { createBlogPost } from '@/data/blog'; 

export async function POST(request: Request) {
  try {
    const { title, content, summary, image } = await request.json();
    const newPost = await createBlogPost(title, content, summary, image);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}