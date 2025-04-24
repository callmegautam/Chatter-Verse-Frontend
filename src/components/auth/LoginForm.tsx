
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type FormData = z.infer<typeof formSchema>;

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Log In to ChatterVerse</h1>
      <p className="text-center text-gray-600 mb-8">
        Welcome back! Log in to continue your social journey.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-social-primary hover:bg-social-secondary" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-social-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>

      {/* Quick login hint for demo purposes */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          <strong>Demo account:</strong> sarah@example.com / password123
        </p>
      </div>
    </div>
  );
};
