
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CreateStoryForm } from '@/components/story/CreateStoryForm';

const CreateStory = () => {
  return (
    <MainLayout>
      <CreateStoryForm />
    </MainLayout>
  );
};

export default CreateStory;
