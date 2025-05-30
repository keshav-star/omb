'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { IconBell, IconMoon, IconLanguage, IconTrash } from '@tabler/icons-react';

interface UserSettings {
  emailNotifications: boolean;
  darkMode: boolean;
  language: string;
}

export function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    darkMode: true,
    language: 'en',
  });

  const handleSettingChange = async (key: keyof UserSettings, value: any) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/v1/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [key]: value }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to update settings');
      }

      setSettings((prev) => ({ ...prev, [key]: value }));
      setSuccess('Settings updated successfully');
    } catch (error) {
      console.error('Settings update failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/v1/user', {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete account');
      }

      // Redirect to home page after successful deletion
      window.location.href = '/';
    } catch (error) {
      console.error('Account deletion failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-black/50 backdrop-blur-sm border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-6"
          >
            <p className="text-red-500 text-sm">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg mb-6"
          >
            <p className="text-green-500 text-sm">{success}</p>
          </motion.div>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconBell className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="text-white font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-400">
                  Receive email updates about your account
                </p>
              </div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                handleSettingChange('emailNotifications', checked)
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconMoon className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="text-white font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-400">
                  Toggle dark mode appearance
                </p>
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) =>
                handleSettingChange('darkMode', checked)
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconLanguage className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="text-white font-medium">Language</h3>
                <p className="text-sm text-gray-400">
                  Choose your preferred language
                </p>
              </div>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              disabled={isLoading}
              className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-black/50 backdrop-blur-sm border border-red-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <IconTrash className="w-5 h-5 text-red-400" />
            <div>
              <h3 className="text-white font-medium">Delete Account</h3>
              <p className="text-sm text-gray-400">
                Permanently delete your account and all associated data
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
} 