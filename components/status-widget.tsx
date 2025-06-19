"use client";

import { useState, useEffect } from 'react';

export function StatusWidget() {
  const [status, setStatus] = useState<'operational' | 'degraded' | 'down'>('operational');

  const statusConfig = {
    operational: {
      color: 'bg-green-500',
      text: 'All systems operational',
      textColor: 'text-green-600 dark:text-green-400'
    },
    degraded: {
      color: 'bg-yellow-500',
      text: 'Some systems degraded',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    down: {
      color: 'bg-red-500',
      text: 'Systems experiencing issues',
      textColor: 'text-red-600 dark:text-red-400'
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${currentStatus.color} animate-pulse`} />
      <span className={`text-xs ${currentStatus.textColor}`}>
        {currentStatus.text}
      </span>
    </div>
  );
}