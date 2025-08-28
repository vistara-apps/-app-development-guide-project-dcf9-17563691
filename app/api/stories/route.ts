
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock database - in production, use a real database
let stories: any[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all';
  
  let filteredStories = stories;
  if (filter !== 'all') {
    filteredStories = stories.filter(story => story.storyType === filter);
  }
  
  // Sort by timestamp, newest first
  filteredStories.sort((a, b) => b.timestamp - a.timestamp);
  
  return NextResponse.json({ stories: filteredStories });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, storyType, authorMessage } = body;
    
    if (!title || !content || !storyType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const story = {
      storyId: uuidv4(),
      title,
      content,
      storyType,
      authorMessage,
      timestamp: Math.floor(Date.now() / 1000),
      tipCount: 0,
      totalTipped: 0,
    };
    
    // In production, store in blockchain/Arweave
    stories.push(story);
    
    return NextResponse.json({ success: true, story });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create story' },
      { status: 500 }
    );
  }
}
