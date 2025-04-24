
import React from 'react';
import { useSocial, Story } from '@/context/SocialContext';
import { StoryCircle } from './StoryCircle';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';

export const StoriesCarousel: React.FC = () => {
  const { stories } = useSocial();
  const { user } = useAuth();
  
  // Group stories by user, showing only the latest for each
  const userStories = stories.reduce((acc, story) => {
    if (!acc[story.userId] || new Date(acc[story.userId].createdAt) < new Date(story.createdAt)) {
      acc[story.userId] = story;
    }
    return acc;
  }, {} as Record<string, Story>);
  
  const latestStories = Object.values(userStories);
  
  if (latestStories.length === 0 && !user) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-2">
          {user && <StoryCircle isCreateStory />}
          
          {latestStories.map(story => (
            <StoryCircle key={story.id} story={story} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
