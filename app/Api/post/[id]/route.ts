import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import data from '../../../data/blog.json';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const token = cookies().get('token');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  const post = data.find((post) => post.id.toString() === id);

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
