import { NextResponse } from 'next/server';
import { sendNFTNotification } from '@/services/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nft, chatId } = body;

    if (!nft || !chatId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sendNFTNotification(chatId, nft);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
} 