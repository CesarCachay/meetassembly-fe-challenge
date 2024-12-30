// types
import { NextRequest } from 'next/server';

const PEXELS_API_URL = 'https://api.pexels.com/v1/search';
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export async function GET(req: NextRequest) {
  if (!req.url) {
    return new Response(JSON.stringify({ error: 'Invalid request URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const per_page = searchParams.get('per_page') || 12;
  const page = searchParams.get('page') || 1;

  if (!PEXELS_API_URL) {
    console.error('Missing API key for Pexels API');
    return new Response(
      JSON.stringify({ error: 'Missing API key for Pexels API' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const response = await fetch(
      `${PEXELS_API_URL}?query=${query}&per_page=${per_page}&page=${page}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        } as HeadersInit,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify(error), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching Pexels API:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch images from Pexels API.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
