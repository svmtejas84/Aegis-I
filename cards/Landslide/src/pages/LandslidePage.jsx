// src/pages/LandslidePage.js

import React from 'react';
import Scrollytelling from '../componenets/Scrollytelling.jsx'; // Import the reusable component
import landslideVideo from '../assets/landslide-animation.mp4'; // Import your NEW video asset

// 1. Define the "chapters" for the landslide story.
// Adjust time (in seconds) to match your video.
const chapters = [
  {
    time: 0,
    title: 'The Unstable Slope',
    description: 'Landslides are the movement of rock, earth, or debris down a sloped section of land. They are often triggered by heavy rainfall or earthquakes.'
  },
  {
    time: 6, // Example: at 6 seconds
    title: 'The Trigger Point',
    description: 'Water saturates the soil, reducing friction between layers of earth. Gravity overcomes the slope\'s stability, and the mass begins to move.'
  },
  {
    time: 12, // Example: at 12 seconds
    title: 'The Debris Flow',
    description: 'The landslide rapidly accelerates, becoming a fast-moving flow of mud, rock, and debris. It can travel for miles, destroying everything in its path.'
  }
];

/**
 * This page component "drives" the scrollytelling experience.
 * It passes the specific landslide video and chapter data
 * into your reusable Scrollytelling component.
 */
function LandslidePage() {
  return (
    <div className="landslide-story-container">
      <Scrollytelling
        videoSrc={landslideVideo}
        chapters={chapters}
      />
    </div>
  );
}

export default LandslidePage;
