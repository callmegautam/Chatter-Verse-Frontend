
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfileGrid } from '@/components/profile/ProfileGrid';
import { useSocial } from '@/context/SocialContext';

const Saved = () => {
  const { getSavedPosts } = useSocial();
  const savedPosts = getSavedPosts();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Saved Posts</h1>
        
        {savedPosts.length > 0 ? (
          <ProfileGrid posts={savedPosts} />
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-4">You haven't saved any posts yet.</p>
            <p className="text-sm text-gray-400">
              When you save posts, they'll appear here for you to easily find later.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Saved;
