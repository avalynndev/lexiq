"use client";

import { useEffect, useState } from "react";

export function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 border border-blue-300/30 dark:border-blue-400/20 rounded-lg rotate-12 animate-float-slow" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full animate-float-medium" />
      <div className="absolute top-60 left-1/4 w-8 h-8 border-2 border-green-300/30 dark:border-green-400/20 rotate-45 animate-float-fast" />

      <div className="absolute top-80 right-1/3 w-20 h-20 border border-purple-300/30 dark:border-purple-400/20 rounded-full animate-float-slow delay-1000" />
      <div className="absolute top-96 left-1/2 w-10 h-10 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-500/10 dark:to-cyan-500/10 rotate-12 animate-float-medium delay-500" />

      <div className="absolute top-[500px] right-10 w-14 h-14 border-2 border-pink-300/30 dark:border-pink-400/20 rounded-lg animate-float-fast delay-1500" />
      <div className="absolute top-[600px] left-20 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 dark:from-green-500/10 dark:to-blue-500/10 rounded-full animate-float-slow delay-2000" />

      <div className="absolute top-[700px] right-1/4 w-12 h-12 border border-cyan-300/30 dark:border-cyan-400/20 rotate-45 animate-float-medium delay-1000" />
      <div className="absolute top-[800px] left-1/3 w-18 h-18 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 dark:from-purple-500/10 dark:to-indigo-500/10 rounded-lg animate-float-fast delay-2500" />

      {/* Floating dots */}
      <div className="absolute top-32 left-1/3 w-2 h-2 bg-blue-400/40 dark:bg-blue-300/30 rounded-full animate-pulse animate-slow" />
      <div className="absolute top-48 right-1/4 w-1.5 h-1.5 bg-purple-400/40 dark:bg-purple-300/30 rounded-full animate-pulse animate-slow delay-500" />
      <div className="absolute top-64 left-2/3 w-1 h-1 bg-green-400/40 dark:bg-green-300/30 rounded-full animate-pulse animate-slow delay-1000" />

      <div className="absolute top-[400px] right-1/2 w-2.5 h-2.5 bg-pink-400/40 dark:bg-pink-300/30 rounded-full animate-pulse animate-slow delay-1500" />
      <div className="absolute top-[500px] left-1/4 w-1.5 h-1.5 bg-cyan-400/40 dark:bg-cyan-300/30 rounded-full animate-pulse animate-slow delay-2000" />

      {/* Floating lines */}
      <div className="absolute top-24 left-1/2 w-20 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent dark:via-blue-300/20 animate-float-horizontal" />
      <div className="absolute top-48 right-1/3 w-16 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent dark:via-purple-300/20 animate-float-horizontal delay-1000" />
      <div className="absolute top-72 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent dark:via-green-300/20 animate-float-horizontal delay-2000" />

      <div className="absolute top-[450px] right-1/4 w-18 h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent dark:via-pink-300/20 animate-float-horizontal delay-1500" />
      <div className="absolute top-[600px] left-1/2 w-22 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent dark:via-cyan-300/20 animate-float-horizontal delay-2500" />
    </div>
  );
}
