
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth, User } from './AuthContext';

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  saved: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  image: string;
  createdAt: string;
  expiresAt: string;
}

export interface Following {
  followerId: string;
  followingId: string;
}

interface SocialContextType {
  posts: Post[];
  stories: Story[];
  followers: Following[];
  following: Following[];
  createPost: (content: string, image?: string) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  savePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  createStory: (image: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  getUserPosts: (userId: string) => Post[];
  getSavedPosts: () => Post[];
  isFollowing: (userId: string) => boolean;
}

// Mock data for initial posts
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: '2',
    username: 'mike_smith',
    userAvatar: 'https://source.unsplash.com/collection/1346951/150x150?2',
    content: 'Just visited this amazing place! What do you think?',
    image: 'https://source.unsplash.com/1600x900/?travel',
    likes: ['1'],
    comments: [
      {
        id: '101',
        postId: '1',
        userId: '1',
        username: 'sarah_johnson',
        userAvatar: 'https://source.unsplash.com/collection/1346951/150x150?1',
        content: 'Looks awesome! Where is this?',
        createdAt: new Date(Date.now() - 36000000).toISOString()
      }
    ],
    saved: [],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '2',
    userId: '1',
    username: 'sarah_johnson',
    userAvatar: 'https://source.unsplash.com/collection/1346951/150x150?1',
    content: 'New camera setup finally arrived! Excited to try it out this weekend.',
    image: 'https://source.unsplash.com/1600x900/?camera',
    likes: ['2'],
    comments: [],
    saved: ['2'],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '3',
    userId: '2',
    username: 'mike_smith',
    userAvatar: 'https://source.unsplash.com/collection/1346951/150x150?2',
    content: 'Working from home today with my trusty companion.',
    image: 'https://source.unsplash.com/1600x900/?cat',
    likes: [],
    comments: [],
    saved: [],
    createdAt: new Date(Date.now() - 259200000).toISOString()
  }
];

// Mock data for initial stories
const MOCK_STORIES: Story[] = [
  {
    id: '1',
    userId: '1',
    username: 'sarah_johnson',
    userAvatar: 'https://source.unsplash.com/collection/1346951/150x150?1',
    image: 'https://source.unsplash.com/1600x900/?sunset',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 82800000).toISOString()
  },
  {
    id: '2',
    userId: '2',
    username: 'mike_smith',
    userAvatar: 'https://source.unsplash.com/collection/1346951/150x150?2',
    image: 'https://source.unsplash.com/1600x900/?mountain',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    expiresAt: new Date(Date.now() + 79200000).toISOString()
  }
];

// Mock data for initial followings
const MOCK_FOLLOWINGS: Following[] = [
  { followerId: '1', followingId: '2' },
  { followerId: '2', followingId: '1' }
];

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [followers, setFollowers] = useState<Following[]>(MOCK_FOLLOWINGS);
  const [following, setFollowing] = useState<Following[]>(MOCK_FOLLOWINGS);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load data from localStorage for persistence
    const storedPosts = localStorage.getItem('posts');
    const storedStories = localStorage.getItem('stories');
    const storedFollowers = localStorage.getItem('followers');
    const storedFollowing = localStorage.getItem('following');

    if (storedPosts) setPosts(JSON.parse(storedPosts));
    if (storedStories) setStories(JSON.parse(storedStories));
    if (storedFollowers) setFollowers(JSON.parse(storedFollowers));
    if (storedFollowing) setFollowing(JSON.parse(storedFollowing));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('stories', JSON.stringify(stories));
    localStorage.setItem('followers', JSON.stringify(followers));
    localStorage.setItem('following', JSON.stringify(following));
  }, [posts, stories, followers, following]);

  // Clean up expired stories
  useEffect(() => {
    const now = new Date().toISOString();
    const activeStories = stories.filter(story => story.expiresAt > now);
    
    if (activeStories.length !== stories.length) {
      setStories(activeStories);
    }
    
    // Set up interval to check for expired stories
    const interval = setInterval(() => {
      const currentTime = new Date().toISOString();
      setStories(prevStories => 
        prevStories.filter(story => story.expiresAt > currentTime)
      );
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const createPost = (content: string, image?: string) => {
    if (!user) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      content,
      image,
      likes: [],
      comments: [],
      saved: [],
      createdAt: new Date().toISOString()
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
    
    toast({
      title: 'Post Created',
      description: 'Your post has been published',
    });
  };

  const deletePost = (postId: string) => {
    if (!user) return;
    
    const postToDelete = posts.find(post => post.id === postId);
    
    if (postToDelete && postToDelete.userId === user.id) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      
      toast({
        title: 'Post Deleted',
        description: 'Your post has been deleted',
      });
    }
  };

  const likePost = (postId: string) => {
    if (!user) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likes.includes(user.id);
          const updatedLikes = isLiked
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id];
          
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
  };

  const savePost = (postId: string) => {
    if (!user) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const isSaved = post.saved.includes(user.id);
          const updatedSaved = isSaved
            ? post.saved.filter(id => id !== user.id)
            : [...post.saved, user.id];
          
          return { ...post, saved: updatedSaved };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!user || !content.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      content,
      createdAt: new Date().toISOString()
    };
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  const createStory = (image: string) => {
    if (!user) return;
    
    // Stories expire after 24 hours
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);
    
    const newStory: Story = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      image,
      createdAt: new Date().toISOString(),
      expiresAt: expiryDate.toISOString()
    };
    
    setStories(prevStories => [newStory, ...prevStories]);
    
    toast({
      title: 'Story Created',
      description: 'Your story has been published',
    });
  };

  const followUser = (userId: string) => {
    if (!user || user.id === userId) return;
    
    // Check if already following
    const alreadyFollowing = following.some(
      f => f.followerId === user.id && f.followingId === userId
    );
    
    if (!alreadyFollowing) {
      const newFollowing: Following = {
        followerId: user.id,
        followingId: userId
      };
      
      setFollowing(prev => [...prev, newFollowing]);
      
      toast({
        title: 'Success',
        description: 'You are now following this user',
      });
    }
  };

  const unfollowUser = (userId: string) => {
    if (!user) return;
    
    setFollowing(prev => 
      prev.filter(
        f => !(f.followerId === user.id && f.followingId === userId)
      )
    );
    
    toast({
      title: 'Unfollowed',
      description: 'You have unfollowed this user',
    });
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.userId === userId);
  };

  const getSavedPosts = () => {
    if (!user) return [];
    return posts.filter(post => post.saved.includes(user.id));
  };

  const isFollowing = (userId: string) => {
    if (!user) return false;
    return following.some(
      f => f.followerId === user.id && f.followingId === userId
    );
  };

  return (
    <SocialContext.Provider
      value={{
        posts,
        stories,
        followers,
        following,
        createPost,
        deletePost,
        likePost,
        savePost,
        addComment,
        createStory,
        followUser,
        unfollowUser,
        getUserPosts,
        getSavedPosts,
        isFollowing
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
