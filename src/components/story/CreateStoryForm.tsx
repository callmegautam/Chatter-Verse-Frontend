
import React, { useState } from 'react';
import { useSocial } from '@/context/SocialContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image, X } from 'lucide-react';

export const CreateStoryForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { createStory } = useSocial();
  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreview) {
      createStory(imagePreview);
      navigate('/');
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-6">Create Story</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!imagePreview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <label className="cursor-pointer flex flex-col items-center">
                <Image className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-lg font-medium text-gray-700 mb-2">
                  Select an image for your story
                </span>
                <span className="text-sm text-gray-500 mb-4">
                  Recommended: Square images work best
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  required
                />
                <Button type="button" variant="outline">
                  Choose Image
                </Button>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Story preview"
                className="w-full rounded-lg max-h-[70vh] object-contain"
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

          <div className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!imagePreview}
              className="bg-social-primary hover:bg-social-secondary"
            >
              Share Story
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
