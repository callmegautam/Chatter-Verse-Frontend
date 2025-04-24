
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSocial } from '@/context/SocialContext';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare } from 'lucide-react';

const Activity = () => {
  const { user } = useAuth();
  const { posts } = useSocial();
  
  if (!user) return null;

  // In a real app, you'd fetch activities from the backend
  // For this demo, we'll generate mock activities from posts
  const activities = posts.flatMap(post => {
    const activities = [];
    
    // Likes on the current user's posts
    if (post.userId === user.id) {
      post.likes.forEach(userId => {
        if (userId !== user.id) {
          activities.push({
            id: `like_${post.id}_${userId}`,
            type: 'like',
            userId,
            postId: post.id,
            username: 'user_' + userId, // In a real app, you'd have the actual username
            userAvatar: `https://source.unsplash.com/collection/1346951/150x150?${userId}`,
            createdAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString() // Random time within last week
          });
        }
      });
      
      // Comments on the current user's posts
      post.comments.forEach(comment => {
        if (comment.userId !== user.id) {
          activities.push({
            id: comment.id,
            type: 'comment',
            userId: comment.userId,
            postId: post.id,
            username: comment.username,
            userAvatar: comment.userAvatar,
            content: comment.content,
            createdAt: comment.createdAt
          });
        }
      });
    }
    
    return activities;
  });
  
  // Sort by date (newest first)
  activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Activity</h1>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="follows">Follows</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ActivityList activities={activities} />
          </TabsContent>
          
          <TabsContent value="likes">
            <ActivityList activities={activities.filter(a => a.type === 'like')} />
          </TabsContent>
          
          <TabsContent value="comments">
            <ActivityList activities={activities.filter(a => a.type === 'comment')} />
          </TabsContent>
          
          <TabsContent value="follows">
            <div className="text-center p-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No new follows yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

interface ActivityListProps {
  activities: any[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">No activity to show.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {activities.map(activity => (
        <div 
          key={activity.id} 
          className="flex items-start p-4 border-b last:border-b-0 border-gray-100"
        >
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={activity.userAvatar} alt={activity.username} />
            <AvatarFallback>{activity.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium mr-2">{activity.username}</span>
              
              {activity.type === 'like' && (
                <>
                  <span className="text-gray-600">liked your post</span>
                  <Heart className="h-4 w-4 text-red-500 ml-2" />
                </>
              )}
              
              {activity.type === 'comment' && (
                <>
                  <span className="text-gray-600">commented on your post:</span>
                  <MessageSquare className="h-4 w-4 text-blue-500 ml-2" />
                </>
              )}
            </div>
            
            {activity.type === 'comment' && (
              <p className="text-gray-600 mt-1">{activity.content}</p>
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Activity;
