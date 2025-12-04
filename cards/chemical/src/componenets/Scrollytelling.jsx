// src/components/Scrollytelling.jsx

import React, { useRef, useEffect, useState, useMemo } from 'react';
import './Scrollytelling.css'; // Import the corresponding styles

// Helper to keep percentages in the expected range
const clampPercent = (value) => Math.min(100, Math.max(0, value));

// The Core Engine component: Handles scroll logic, video scrubbing, and text display
const Scrollytelling = ({ videoSrc, chapters = [] }) => {
  // 1. Refs for DOM elements
  const containerRef = useRef(null); // The overall container for scroll tracking
  const videoRef = useRef(null);    // The video element for playback control

  // Prepare chapter metadata so the scroll logic always has the fields it expects
  const normalizedChapters = useMemo(() => {
    if (!Array.isArray(chapters) || chapters.length === 0) {
      return [];
    }

    const defaultSegment = 100 / chapters.length;

    return chapters.map((chapter, index) => {
      const hasRange = Array.isArray(chapter.range) && chapter.range.length === 2;
      const start = hasRange
        ? clampPercent(chapter.range[0])
        : clampPercent(chapter.start ?? chapter.time ?? index * defaultSegment);
      const end = hasRange
        ? clampPercent(chapter.range[1])
        : clampPercent(chapter.end ?? (index + 1) * defaultSegment);

      return {
        ...chapter,
        range: [start, Math.max(start, end)],
        text: chapter.text ?? chapter.description ?? '',
      };
    });
  }, [chapters]);

  // 2. State for active chapter (text to display)
  const [activeChapter, setActiveChapter] = useState(() => normalizedChapters[0] ?? null);

  useEffect(() => {
    setActiveChapter(normalizedChapters[0] ?? null);
  }, [normalizedChapters]);

  // 3. Effect to handle scroll-to-video scrubbing and chapter logic
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video || normalizedChapters.length === 0) return;

    // The scroll handler function
    const handleScroll = () => {
      // Calculate scroll position relative to the container
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // The scroll distance within the active area
      const scrollDistance = window.scrollY - (containerTop - viewportHeight / 2);

      // The total scrollable distance for the scrollytelling section
      const scrollableHeight = Math.max(containerHeight - viewportHeight, 1);

      // Calculate scroll percentage (0 to 100)
      let scrollPercent = (scrollDistance / scrollableHeight) * 100;
      scrollPercent = clampPercent(scrollPercent);

      // Calculate the corresponding video time
      if (video.duration) {
        video.currentTime = (scrollPercent / 100) * video.duration;
      }

      // Determine the active chapter based on scroll percentage
      const currentChapter =
        normalizedChapters.find(({ range }) => scrollPercent >= range[0] && scrollPercent <= range[1]) ??
        normalizedChapters[normalizedChapters.length - 1];

      setActiveChapter(currentChapter ?? null);
    };

    // Attach the event listener and run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call to set state correctly

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [normalizedChapters]);

  // Calculate the height needed to make the scrolling last the desired time
  // This is based on the number of chapters and a multiplier for scroll speed/length
  const totalScrollHeight = normalizedChapters.length * 150; // Use a multiplier (e.g., 150vh per chapter)
  
  return (
    // The main container. Its height dictates the scrollable area
    <div 
      ref={containerRef} 
      className="scrollytelling-container"
      style={{ height: `${totalScrollHeight}vh` }} // Set the container height dynamically
    >
      {/* The sticky video element */}
      <div className="scrollytelling-video-wrapper">
        <video
          className="scrollytelling-video"
          ref={videoRef}
          src={videoSrc}
          preload="auto"
          muted
          playsInline
          autoPlay
          loop
          aria-hidden="true"
        />
      </div>

      {/* The overlay content box */}
      <div className="scrollytelling-chapter-overlay">
        {activeChapter ? (
          <div className="chapter-text fade-in">
            <h2>{activeChapter.title}</h2>
            <p>{activeChapter.text || activeChapter.description}</p>
          </div>
        ) : (
          // Optional: Display a placeholder when no chapter is active
          <div className="chapter-text fade-out">
            {/* Fade out content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scrollytelling;