// src/components/Scrollytelling.js

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Scrollytelling.css'; // Import the corresponding styles

// The Core Engine component: Handles scroll logic, video scrubbing, and text display
const Scrollytelling = ({ videoSrc, chapters }) => {
  // 1. Refs for DOM elements
  const containerRef = useRef(null); // The overall container for scroll tracking
  const videoRef = useRef(null);    // The video element for playback control

  // 2. State for active chapter (text to display)
  const [activeChapter, setActiveChapter] = useState(null);

  // 3. Effect to handle scroll-to-video scrubbing and chapter logic
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) return;

    // The scroll handler function
    const handleScroll = () => {
      // Calculate scroll position relative to the container
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // The scroll distance within the active area
      const scrollDistance = window.scrollY - (containerTop - viewportHeight / 2);

      // The total scrollable distance for the scrollytelling section
      // The total height of the chapters minus the viewport height gives the scrollable distance
      const totalScrollHeight = containerHeight - viewportHeight;
      
      // Calculate scroll percentage (0 to 100)
      let scrollPercent = (scrollDistance / totalScrollHeight) * 100;
      scrollPercent = Math.max(0, Math.min(100, scrollPercent)); // Clamp between 0 and 100

      // Calculate the corresponding video time
      if (video.duration) {
        video.currentTime = (scrollPercent / 100) * video.duration;
      }

      // Determine the active chapter based on current video time and chapter "time" thresholds
      const currentTime = video.currentTime || 0;
      let current = chapters[0] || null;
      for (let i = 0; i < chapters.length; i++) {
        if (currentTime >= chapters[i].time) {
          current = chapters[i];
        } else {
          break;
        }
      }
      setActiveChapter(current);
    };

    // Attach the event listener and run once on mount
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set state correctly

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [chapters]); // Rerun if the chapters array changes (though it shouldn't in this case)

  // Calculate the height needed to make the scrolling last the desired time
  // This is based on the number of chapters and a multiplier for scroll speed/length
  const totalScrollHeight = chapters.length * 150; // Use a multiplier (e.g., 150vh per chapter)
  
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
          ref={videoRef} 
          src={videoSrc} 
          preload="auto" 
          muted 
          playsInline 
        />
      </div>

      {/* The overlay content box */}
      <div className="scrollytelling-chapter-overlay">
        {activeChapter ? (
          <div className="chapter-text fade-in">
            <h2>{activeChapter.title}</h2>
            <p>{activeChapter.description}</p>
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
