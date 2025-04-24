
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSocial } from '@/context/SocialContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Image, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  content: z.string().max(500, { message: 'Post content must be 500 characters or less' }),
});

type FormData = z.infer<typeof formSchema>;

export const CreatePostForm: React.FC = () => {
  const { createPost } = useSocial();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const onSubmit = (data: FormData) => {
    createPost(data.content, imagePreview || undefined);
    form.reset();
    setImagePreview(null);
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      
      <div className="flex items-center space-x-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{user.username}</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="What's on your mind?"
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-80 rounded-lg mx-auto object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="flex items-center text-gray-500 hover:text-social-primary transition-colors">
                <Image className="h-5 w-5 mr-2" />
                <span>Add Photo</span>
              </div>
            </label>

            <Button 
              type="submit" 
              disabled={!form.formState.isDirty && !imagePreview}
              className="bg-social-primary hover:bg-social-secondary"
            >
              Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
