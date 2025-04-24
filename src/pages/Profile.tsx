
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfilePosts } from '@/components/profile/ProfilePosts';
import { ProfileGrid } from '@/components/profile/ProfileGrid';
import { useAuth, User } from '@/context/AuthContext';
import { useSocial } from '@/context/SocialContext';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getUserPosts, getSavedPosts } = useSocial();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('posts');
  
  useEffect(() => {
    // In a real app, you'd fetch user data from API
    // For demo, we'll use the current user if IDs match
    if (user && user.id === id) {
      setProfileUser(user);
    } else {
      // Mock fetch for other users - in a real app, you'd fetch from backend
      const mockUser: User = {
        id: id || '2',
        username: 'mike_smith',
        name: 'Mike Smith',
        email: 'mike@example.com',
        bio: 'Travel blogger and tech enthusiast',
        avatar: 'https://source.unsplash.com/collection/1346951/150x150?2',
        followersCount: 845,
        followingCount: 412
      };
      setProfileUser(mockUser);
    }
  }, [id, user]);

  if (!profileUser) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-social-primary"></div>
        </div>
      </MainLayout>
    );
  }

  const userPosts = getUserPosts(profileUser.id);
  const savedPosts = getSavedPosts();
  
  // Show posts based on active tab
  const displayedPosts = activeTab === 'posts' 
    ? userPosts 
    : activeTab === 'saved' && user?.id === profileUser.id
      ? savedPosts
      : [];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <ProfileHeader 
          profileUser={profileUser} 
          postsCount={userPosts.length} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {/* Tab content */}
        <div className="mt-6">
          {activeTab === 'posts' && (
            <ProfileGrid posts={userPosts} />
          )}
          
          {activeTab === 'saved' && profileUser.id === user?.id && (
            <ProfileGrid posts={savedPosts} />
          )}
          
          {activeTab === 'tagged' && (
            <div className="text-center p-10">
              <p className="text-gray-500">No tagged posts yet.</p>
            </div>
          )}
          
          {activeTab === 'saved' && profileUser.id !== user?.id && (
            <div className="text-center p-10">
              <p className="text-gray-500">This content is private.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
