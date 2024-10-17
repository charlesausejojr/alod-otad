import { NextResponse } from 'next/server';

const BASE_URL = 'http://localhost:5000/api/peers';

export async function GET() {
    try {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error(`Error fetching Peers data: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        const message = (error instanceof Error) ? error.message : 'An unexpected error occurred.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
      const peer = await request.json();
      console.log(peer);
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(peer),
      });
  
      if (!response.ok) {
        throw new Error(`Error adding Peer: ${response.statusText}`);
      }
  
      const data = await response.json();
      return NextResponse.json(data, { status: 201 });
    } catch (error) {
      console.error('Error adding peer:', error);
      const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
      return NextResponse.json({ error: message }, { status: 500 });
    }
}


