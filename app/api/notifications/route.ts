import { NextRequest, NextResponse } from 'next/server';

// In production, this would store to Supabase/PostgreSQL
const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'breaking',
    title: 'Breaking News',
    message: 'Mbappé prolonge au Real Madrid jusqu\'en 2029 !',
    articleId: 'a2',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'algerie',
    title: 'Équipe d\'Algérie',
    message: 'La liste des convoqués pour le match contre la Guinée est tombée',
    articleId: 'a7',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
];

export async function GET() {
  return NextResponse.json({ notifications: MOCK_NOTIFICATIONS });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, message, type } = body;

  if (!title || !message || !type) {
    return NextResponse.json({ error: 'title, message et type sont requis' }, { status: 400 });
  }

  const notification = {
    id: `n-${Date.now()}`,
    type,
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };

  // In production: save to Supabase, push via FCM/APNs etc.
  return NextResponse.json({ success: true, notification }, { status: 201 });
}
