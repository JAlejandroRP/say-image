import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const data = JSON.stringify(req);
  if (req.method === 'POST') {
    return NextResponse.json({ message: "OK", data});
  }
}