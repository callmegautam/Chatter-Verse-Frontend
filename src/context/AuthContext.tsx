
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  followersCount: number;
  followingCount: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from your backend
const MOCK_USERS = [
  {
    id: '1',
    username: 'sarah_johnson',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    bio: 'Photography enthusiast and coffee lover',
    avatar: 'https://source.unsplash.com/collection/1346951/150x150?1',
    followersCount: 1204,
    followingCount: 567
  },
  {
    id: '2',
    username: 'mike_smith',
    name: 'Mike Smith',
    email: 'mike@example.com',
    password: 'password123',
    bio: 'Travel blogger and tech enthusiast',
    avatar: 'https://source.unsplash.com/collection/1346951/150x150?2',
    followersCount: 845,
    followingCount: 412
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage (for persistence)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - in a real app, you'd call your backend
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!mockUser) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string, name: string) => {
    setIsLoading(true);
    try {
      // Check if user already exists
      if (MOCK_USERS.find(u => u.email === email || u.username === username)) {
        throw new Error('User already exists');
      }

      // Create new user (in a real app, you'd call your backend)
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        username,
        name,
        email,
        bio: '',
        avatar: `https://source.unsplash.com/collection/1346951/150x150?${MOCK_USERS.length + 1}`,
        followersCount: 0,
        followingCount: 0
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: 'Success',
        description: 'Account created successfully',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account',
        variant: 'destructive',
      });
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
