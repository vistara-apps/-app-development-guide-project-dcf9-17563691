
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock database for tips
let tips: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { storyId, amount, fromFid, toFid } = body;
    
    if (!storyId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid tip data' },
        { status: 400 }
      );
    }
    
    const tip = {
      tipId: uuidv4(),
      storyId,
      fromFid,
      toFid,
      amount,
      timestamp: Math.floor(Date.now() / 1000),
      // In production, add transaction hash after blockchain transaction
      transactionHash: `0x${Math.random().toString(16).slice(2)}`,
    };
    
    tips.push(tip);
    
    // Mock blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({ 
      success: true, 
      tip,
      transactionHash: tip.transactionHash 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process tip' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storyId = searchParams.get('storyId');
  
  if (storyId) {
    const storyTips = tips.filter(tip => tip.storyId === storyId);
    return NextResponse.json({ tips: storyTips });
  }
  
  return NextResponse.json({ tips });
}
