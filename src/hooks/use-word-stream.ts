"use client";

import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 5) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (!text || index >= text.length) {
      return;
    }

    const intervalId = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, speed);

    return () => clearInterval(intervalId);

  }, [index, text, speed]);

  return displayText;
}