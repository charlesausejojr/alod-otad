import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.opendota.com/api';
const API_KEY = process.env.OPENDOTA_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  const params = searchParams.get('params') || '';

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  try {
    const apiUrl = `${BASE_URL}/${endpoint}?${params}&api_key=${API_KEY}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching from OpenDota: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    const message = (error instanceof Error) ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
