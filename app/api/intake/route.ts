import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Best-effort: log intake to server console. In production, forward to CRM, DB, or ticketing system.
    // Avoid logging sensitive data in production.
    // eslint-disable-next-line no-console
    console.info('Audit intake received:', JSON.stringify(body));
    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Intake error', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
