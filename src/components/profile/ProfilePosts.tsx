
import React from 'react';
import { useSocial, Post } from '@/context/SocialContext';
import { PostCard } from '@/components/post/PostCard';

interface ProfilePostsProps {
  posts: Post[];
}

export const ProfilePosts: React.FC<ProfilePostsProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-500">No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
