"use client";

import { useState, useEffect } from 'react';

const words = [
  'freelancers',
  'consultants', 
  'agencies',
  'startups',
  'creators',
  'developers'
];

export function WordAnimation() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 150);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {words[currentWordIndex]}
    </span>
  );
}