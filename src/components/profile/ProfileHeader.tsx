
import React, { useState } from 'react';
import { User, useAuth } from '@/context/AuthContext';
import { useSocial } from '@/context/SocialContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProfileHeaderProps {
  profileUser: User;
  postsCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profileUser, 
  postsCount,
  activeTab,
  setActiveTab
}) => {
  const { user } = useAuth();
  const { followUser, unfollowUser, isFollowing } = useSocial();
  const isCurrentUser = user?.id === profileUser.id;
  const following = isFollowing(profileUser.id);
  
  const handleFollowAction = () => {
    if (following) {
      unfollowUser(profileUser.id);
    } else {
      followUser(profileUser.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
      {/* Cover photo */}
      <div className="h-32 md:h-48 bg-gradient-to-r from-purple-200 via-purple-300 to-blue-200"></div>
      
      {/* Profile info */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-end">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 -mt-16 md:-mt-20 rounded-full overflow-hidden border-4 border-white">
            <Avatar className="w-full h-full">
              <AvatarImage src={profileUser.avatar} alt={profileUser.username} />
              <AvatarFallback>{profileUser.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          
          {/* User info */}
          <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{profileUser.name}</h1>
                <p className="text-gray-500">@{profileUser.username}</p>
              </div>
              
              {!isCurrentUser && (
                <Button 
                  onClick={handleFollowAction}
                  variant={following ? "outline" : "default"}
                  className={following ? "" : "bg-social-primary hover:bg-social-secondary"}
                >
                  {following ? 'Following' : 'Follow'}
                </Button>
              )}
              
              {isCurrentUser && (
                <Button asChild variant="outline">
                  <a href="/settings">Edit Profile</a>
                </Button>
              )}
            </div>
            
            {profileUser.bio && (
              <p className="mt-2 text-gray-700">{profileUser.bio}</p>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex justify-around mt-6 border-t border-gray-100 pt-4">
          <div className="text-center">
            <div className="font-bold">{postsCount}</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{profileUser.followersCount}</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{profileUser.followingCount}</div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="tagged">Tagged</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
