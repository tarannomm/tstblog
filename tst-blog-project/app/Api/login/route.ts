import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { log } from 'console';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req:Request, res: NextApiResponse) {
   const {body}=await req.json();
    
    const { username, password } = body.data;
    console.log(username);
    
    if (username === 'azimi' && password === '1234567890') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600;`);
      return NextResponse.json({ message: 'ورود شما با موفقیت انجام شد' }, { status: 200 });

    } else {
      return NextResponse.json({ message: 'اطلاعات وارده نا معتبر میباشد' },{status:401});
    }
 
 
}
