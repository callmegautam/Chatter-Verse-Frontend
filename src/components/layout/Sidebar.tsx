
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Search, 
  PlusSquare, 
  Heart, 
  Bookmark,
  User
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r border-gray-200 bg-white">
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Navigation Links */}
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/explore" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Search className="h-5 w-5" />
            <span>Explore</span>
          </NavLink>

          <NavLink 
            to="/create" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <PlusSquare className="h-5 w-5" />
            <span>Create</span>
          </NavLink>

          <NavLink 
            to="/activity" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Heart className="h-5 w-5" />
            <span>Activity</span>
          </NavLink>

          <NavLink 
            to="/saved" 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <Bookmark className="h-5 w-5" />
            <span>Saved</span>
          </NavLink>

          <NavLink 
            to={`/profile/${user.id}`}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>
        </div>
      </div>

      {/* User Profile at bottom */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <Link to={`/profile/${user.id}`} className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.username}</span>
            <span className="text-sm text-gray-500">{user.name}</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};
