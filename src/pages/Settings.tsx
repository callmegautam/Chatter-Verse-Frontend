
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-0">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="account" className="mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Account Settings</h2>
              <p className="text-gray-500">
                Account settings will be available in a future update.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
              <p className="text-gray-500">
                Notification settings will be available in a future update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
