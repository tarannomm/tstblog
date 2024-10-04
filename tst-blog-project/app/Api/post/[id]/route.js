import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import data from '../../posts/blog.json';

export async function GET(req, { params }) {
  const token = cookies().get('token');

  if (!token || token.value !== 'test-token') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  const post = data.find(post => post.id.toString() === id);

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
