
import React from 'react';
import { Post } from '@/context/SocialContext';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart } from 'lucide-react';

interface ProfileGridProps {
  posts: Post[];
}

export const ProfileGrid: React.FC<ProfileGridProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-500">No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2">
      {posts.map(post => (
        <Link key={post.id} to={`/post/${post.id}`} className="relative aspect-square group">
          {post.image ? (
            <img 
              src={post.image} 
              alt={post.content} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">{post.content.substring(0, 20)}...</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-4 text-white">
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-1" />
                <span>{post.likes.length}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-1" />
                <span>{post.comments.length}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
