import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest) {
     
    const response = NextResponse.json(
        { message: 'شما با موفقیت خارج شدید' },
        { status: 200 }
    );
 
    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0), 
        sameSite: 'strict', 
        secure: process.env.NODE_ENV === 'production', 
    });

    return response;
}
