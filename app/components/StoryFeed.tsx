"use client";

import { useState, useEffect } from "react";
import { StoryCard } from "./StoryCard";
import { mockStories } from "../lib/mockData";
import type { Story } from "../types";

interface StoryFeedProps {
  filter: 'all' | 'rekt' | 'rich';
}

export function StoryFeed({ filter }: StoryFeedProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      let filteredStories = mockStories;
      if (filter !== 'all') {
        filteredStories = mockStories.filter(story => story.storyType === filter);
      }
      setStories(filteredStories);
      setLoading(false);
    }, 500);
  }, [filter]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-text-secondary/20 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-text-secondary/20 rounded w-full mb-2"></div>
            <div className="h-3 bg-text-secondary/20 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No stories yet</h3>
        <p className="text-text-secondary">
          Be the first to share a {filter === 'all' ? '' : filter} story!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <StoryCard key={story.storyId} story={story} />
      ))}
    </div>
  );
}
