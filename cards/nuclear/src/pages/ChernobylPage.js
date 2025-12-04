// src/pages/ChernobylPage.js

import React from 'react';
import Scrollytelling from '../components/Scrollytelling'; // Import the reusable component
import chernobylVideo from '../assets/chernobyl-animation.mp4'; // Import your NEW video asset

// 1. Define the "chapters" for the Chernobyl disaster story.
// Adjust time (in seconds) to match your video.
const chapters = [
  {
    time: 0,
    title: 'The Safety Test',
    description: 'On April 26, 1986, a flawed reactor design and inadequately trained personnel led to a failed safety test at the Chernobyl Nuclear Power Plant in Ukraine.'
  },
  {
    time: 8, // Example: at 8 seconds
    title: 'The Explosion',
    description: 'A sudden power surge caused two massive explosions, destroying Reactor 4 and releasing a catastrophic amount of radioactive material into the atmosphere.'
  },
  {
    time: 16, // Example: at 16 seconds
    title: 'The Radioactive Plume',
    description: 'The resulting fires burned for days, spreading a radioactive plume over large parts of Europe. It remains the worst nuclear disaster in history, with long-term health and environmental consequences.'
  }
];

/**
 * This page component "drives" the scrollytelling experience.
 * It passes the specific Chernobyl disaster video and chapter data
 * into your reusable Scrollytelling component.
 */
function ChernobylPage() {
  return (
    <div className="chernobyl-story-container">
      <Scrollytelling
        videoSrc={chernobylVideo}
        chapters={chapters}
      />
    </div>
  );
}

export default ChernobylPage;
