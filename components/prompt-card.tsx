"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, GitFork, Eye, Clock, Zap } from 'lucide-react';

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    description: string;
    author: {
      name: string;
      avatar: string;
    };
    model: string;
    category: string;
    stars: number;
    forks: number;
    views: number;
    lastUpdated: string;
    isRecent?: boolean;
    isTrending?: boolean;
    tags?: string[];
    solves?: string;
    models?: string[]; // Array of AI models this prompt supports
  };
}

// AI Model Icons Components
const AIIcon = () => (
  <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" color="currentcolor" className="h-4 w-4">
    <path d="M2.5.5V0h1v.5a2 2 0 002 2H6v1h-.5a2 2 0 00-2 2V6h-1v-.5a2 2 0 00-2-2H0v-1h.5a2 2 0 002-2zM14.5 4.5V5h-1v-.5a1 1 0 00-1-1H12v-1h.5a1 1 0 001-1V1h1v.5a1 1 0 001 1h.5v1h-.5a1 1 0 00-1 1zM8.407 4.93L8.5 4h1l.093.93a5 5 0 004.93 4.477L15 9.5v1l-.93.093a5 5 0 00-4.477 4.478L9.5 16h-1l-.093-.93a5 5 0 00-4.478-4.477L3 10.5v-1l.93-.093A5 5 0 008.406 4.93z" fill="currentColor"></path>
  </svg>
);

const OpenAIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260" className="h-4 w-4">
    <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l-.87-51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333V61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 87.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" fill="currentColor"></path>
  </svg>
);

const ClaudeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-4 w-4">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const GeminiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-4 w-4">
    <path fill="currentColor" d="M12 2l3.09 6.26L22 9l-5.91 1.74L12 17l-4.09-6.26L2 9l6.91-0.74L12 2z"/>
  </svg>
);

const LlamaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-4 w-4">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);

export function PromptCard({ prompt }: PromptCardProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(prompt.stars);

  const handleStar = () => {
    setIsStarred(!isStarred);
    setStarCount(prev => isStarred ? prev - 1 : prev + 1);
  };

  const getModelIcon = (model: string) => {
    switch (model.toLowerCase()) {
      case 'gpt-4':
      case 'openai':
        return <OpenAIIcon />;
      case 'claude':
        return <ClaudeIcon />;
      case 'gemini':
        return <GeminiIcon />;
      case 'llama':
        return <LlamaIcon />;
      default:
        return <AIIcon />;
    }
  };

  const getModelTitle = (model: string) => {
    switch (model.toLowerCase()) {
      case 'gpt-4':
        return 'GPT-4';
      case 'claude':
        return 'Claude';
      case 'gemini':
        return 'Gemini';
      case 'llama':
        return 'Llama';
      default:
        return 'AI';
    }
  };

  // Get all supported models, defaulting to the main model if models array not provided
  const supportedModels = prompt.models || [prompt.model];
  const tags = prompt.tags || [prompt.category.toLowerCase(), 'ai'];

  return (
    <a href={`/prompt/${prompt.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all border shadow-lg p-0 group-hover:shadow-xl group-hover:shadow-purple-500/10">
        <div className="flex h-full flex-col pt-6">
          <div className="flex-1 px-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold tracking-tight text-lg">{prompt.title}</h3>
              </div>
              {(prompt.isRecent || prompt.isTrending) && (
                <div className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mr-1 rounded-full text-[10px]">
                  {prompt.isTrending ? 'Trending' : 'New'}
                </div>
              )}
            </div>
            
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {prompt.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag, index) => (
                <div 
                  key={index}
                  className="text-xs text-muted-foreground bg-muted/50 rounded-full px-2 py-1 shadow-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
            
            {prompt.solves && (
              <div className="mt-3 text-xs text-muted-foreground">
                <strong>Solves: </strong>
                <span className="line-clamp-1">{prompt.solves}</span>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-t-border/50 py-4 px-6 group-hover:bg-muted/50">
            <div className="flex items-center gap-1.5">
              {/* AI Model Icons */}
              {supportedModels.slice(0, 4).map((model, index) => (
                <span 
                  key={index}
                  className="text-muted-foreground transition-colors group-hover:text-foreground" 
                  title={getModelTitle(model)}
                >
                  {getModelIcon(model)}
                </span>
              ))}
              {supportedModels.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{supportedModels.length - 4}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              Preview Prompt
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}