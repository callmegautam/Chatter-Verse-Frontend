
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Story } from '@/context/SocialContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface StoryCircleProps {
  story?: Story;
  isCreateStory?: boolean;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({ story, isCreateStory }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleClick = () => {
    if (isCreateStory) {
      navigate('/create-story');
    } else if (story) {
      navigate(`/stories/${story.id}`);
    }
  };

  if (isCreateStory) {
    return (
      <div 
        className="flex flex-col items-center space-y-1 cursor-pointer" 
        onClick={handleClick}
      >
        <div className="story-circle">
          <div className="story-circle-inner bg-social-light">
            <PlusIcon className="h-6 w-6 text-social-primary" />
          </div>
        </div>
        <span className="text-xs font-medium">Add Story</span>
      </div>
    );
  }

  if (!story) return null;

  const isCurrentUser = user && user.id === story.userId;

  return (
    <div 
      className="flex flex-col items-center space-y-1 cursor-pointer" 
      onClick={handleClick}
    >
      <div className="story-circle">
        <div className="story-circle-inner">
          <img 
            src={story.image} 
            alt={story.username} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs font-medium truncate max-w-16">
        {isCurrentUser ? 'Your Story' : story.username}
      </span>
    </div>
  );
};
