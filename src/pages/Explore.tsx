
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useSocial, Post } from '@/context/SocialContext';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileGrid } from '@/components/profile/ProfileGrid';
import { Search } from 'lucide-react';

const Explore = () => {
  const { posts } = useSocial();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Organize posts by categories (in a real app, you'd have proper categorization)
  const categories = {
    popular: posts.sort((a, b) => b.likes.length - a.likes.length),
    latest: [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    photos: posts.filter(post => post.image),
  };
  
  // Filter posts based on search term
  const filteredPosts = searchTerm 
    ? posts.filter(post => 
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Explore</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search posts, users, and tags..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {searchTerm ? (
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-4">Search Results</h2>
            {filteredPosts.length > 0 ? (
              <ProfileGrid posts={filteredPosts} />
            ) : (
              <div className="text-center p-10">
                <p className="text-gray-500">No results found for "{searchTerm}"</p>
              </div>
            )}
          </div>
        ) : (
          <Tabs defaultValue="popular">
            <TabsList className="mb-6">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular">
              <ProfileGrid posts={categories.popular} />
            </TabsContent>
            
            <TabsContent value="latest">
              <ProfileGrid posts={categories.latest} />
            </TabsContent>
            
            <TabsContent value="photos">
              <ProfileGrid posts={categories.photos} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
};

export default Explore;
