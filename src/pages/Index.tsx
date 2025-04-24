
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StoriesCarousel } from '@/components/story/StoriesCarousel';
import { PostCard } from '@/components/post/PostCard';
import { useSocial } from '@/context/SocialContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';

const Home = () => {
  const { posts } = useSocial();
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        {/* Stories carousel */}
        <StoriesCarousel />
        
        {/* Create post button (mobile only) */}
        <div className="md:hidden mb-6 flex justify-center">
          <Button asChild className="bg-social-primary hover:bg-social-secondary">
            <Link to="/create">
              <PlusSquare className="h-5 w-5 mr-2" />
              Create Post
            </Link>
          </Button>
        </div>
        
        {/* Feed */}
        <div className="space-y-6">
          {sortedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share something!</p>
              <Button asChild className="bg-social-primary hover:bg-social-secondary">
                <Link to="/create">Create Post</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
