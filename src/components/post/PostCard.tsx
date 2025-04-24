
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useSocial, Post as PostType } from '@/context/SocialContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Heart, 
  MessageSquare, 
  Bookmark,
  MoreHorizontal,
  Send,
  Trash2,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: PostType;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const { likePost, savePost, deletePost, addComment } = useSocial();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const isLiked = user ? post.likes.includes(user.id) : false;
  const isSaved = user ? post.saved.includes(user.id) : false;
  const isOwnPost = user && post.userId === user.id;
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };
  
  const handleDelete = () => {
    deletePost(post.id);
  };
  
  const formattedTime = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <div className="post-card animate-fade-in">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${post.userId}`} className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.userAvatar} alt={post.username} />
            <AvatarFallback>{post.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{post.username}</span>
            <span className="text-xs text-gray-500">{formattedTime}</span>
          </div>
        </Link>
        {isOwnPost && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDelete} className="text-red-500 focus:text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      {/* Post Content */}
      {post.image && (
        <div className="relative aspect-square">
          <img 
            src={post.image} 
            alt="Post" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {post.content && (
        <div className="p-4">
          <p className="text-sm">{post.content}</p>
        </div>
      )}
      
      {/* Post Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => likePost(post.id)}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleComments}>
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => savePost(post.id)}
          className={isSaved ? "text-social-primary" : ""}
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
        </Button>
      </div>
      
      {/* Like count */}
      {post.likes.length > 0 && (
        <div className="px-4 pb-2">
          <p className="text-sm font-medium">{post.likes.length} like{post.likes.length !== 1 ? 's' : ''}</p>
        </div>
      )}
      
      {/* Comments Section */}
      <div className="border-t border-gray-100">
        {(showComments || post.comments.length < 3) && post.comments.map(comment => (
          <div key={comment.id} className="p-4 flex items-start space-x-3">
            <Avatar className="h-7 w-7">
              <AvatarImage src={comment.userAvatar} alt={comment.username} />
              <AvatarFallback>{comment.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div>
                <span className="font-medium text-sm mr-2">{comment.username}</span>
                <span className="text-sm">{comment.content}</span>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
        
        {/* View more comments button */}
        {!showComments && post.comments.length > 2 && (
          <button 
            className="p-4 text-sm text-gray-500 hover:text-gray-700 w-full text-left"
            onClick={toggleComments}
          >
            View all {post.comments.length} comments
          </button>
        )}
        
        {/* Add Comment Form */}
        {user && (
          <form onSubmit={handleComment} className="p-4 flex items-center space-x-3 border-t border-gray-100">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-0 h-9 py-2 resize-none"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              disabled={!commentText.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
