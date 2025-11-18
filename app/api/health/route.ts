import { NextResponse } from 'next/server';

export function GET() {
  const uptime = process.uptime();
  return NextResponse.json({
    status: 'ok',
    uptime_seconds: Math.round(uptime),
    timestamp: new Date().toISOString(),
  });
}
