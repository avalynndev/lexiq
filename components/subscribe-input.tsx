"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SubscribeInput() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your newsletter service
    }
  };

  if (isSubscribed) {
    return (
      <div className="text-sm text-green-600 dark:text-green-400">
        Thanks for subscribing! 🎉
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <h3 className="text-sm font-medium mb-3">Stay updated</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 text-sm"
          required
        />
        <Button type="submit" size="sm" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
          Subscribe
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-2">
        Get notified about new prompts and features.
      </p>
    </div>
  );
}