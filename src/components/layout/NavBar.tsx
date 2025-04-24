
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Home, Search, Settings, LogOut, Menu, X } from 'lucide-react';

export const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-social-primary">ChatterVerse</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 bg-gray-100 border-none"
              />
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user.id}`} className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileNavOpen && (
          <div className="md:hidden py-2 pb-4">
            <div className="pt-2 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 bg-gray-100 border-none"
                />
              </div>
            </div>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileNavOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
              <Link 
                to={`/profile/${user?.id}`}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileNavOpen(false)}
              >
                <Avatar className="h-5 w-5 mr-3">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>Profile</span>
              </Link>
              <Link 
                to="/settings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileNavOpen(false)}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </Link>
              <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full text-left"
                onClick={() => {
                  setMobileNavOpen(false);
                  logout();
                }}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Log out</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
