import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocialProvider } from './context/SocialContext';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Create from './pages/Create';
import CreateStory from './pages/CreateStory';
import Explore from './pages/Explore';
import Saved from './pages/Saved';
import Activity from './pages/Activity';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <AuthProvider>
                    <SocialProvider>
                        <Routes>
                            <Route path='/' element={<Index />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/profile/:id' element={<Profile />} />
                            <Route path='/settings' element={<Settings />} />
                            <Route path='/create' element={<Create />} />
                            <Route path='/create-story' element={<CreateStory />} />
                            <Route path='/explore' element={<Explore />} />
                            <Route path='/saved' element={<Saved />} />
                            <Route path='/activity' element={<Activity />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </SocialProvider>
                </AuthProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
