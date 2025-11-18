export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get('name') || undefined;

    // Very small, safe personalization example.
    // In real world: look up lightweight user prefs from a cookie or edge cache.
    const greeting = name ? `Hi ${name},` : 'Hi there,';

    const variant = (req.headers.get('accept-language') || '').startsWith('es') ? 'es' : 'default';

    return NextResponse.json({ greeting, variant });
  } catch (err) {
    return NextResponse.json({ greeting: 'Hello', variant: 'default' });
  }
}
