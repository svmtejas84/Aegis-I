// src/pages/CyclonePage.js

import React from 'react';
import Scrollytelling from '../componenets/Scrollytelling.jsx'; // Import the reusable component
import cycloneVideo from '../assets/cyclone-animation.mp4'; // Import your video asset

// Define the "chapters" of your story.
// This version includes only 3 chapters.
const chapters = [
  {
    time: 0,
    title: 'The Birth of a Cyclone',
    description: 'Cyclones, also known as hurricanes or typhoons, are massive, rotating storm systems that form over warm ocean waters.'
  },
  {
    time: 7, // Example: at 7 seconds into the video
    title: 'Fueling the Storm',
    description: 'Warm, moist air rises from the ocean surface, creating an area of low pressure. As the air cools, it forms clouds, releasing heat and powering the storm.'
  },
  {
    time: 15, // Example: at 15 seconds
    title: 'The Eye of the Storm',
    description: 'As the storm spins faster, a calm, clear center forms, known as the "eye." It is surrounded by the "eyewall," where the winds are the strongest.'
  }
];

/**
 * This page component acts as the "driver" for the scrollytelling experience.
 * It just imports the reusable Scrollytelling component and passes it
 * the specific video and chapter data it needs to display.
 */
function CyclonePage() {
  return (
    <div className="cyclone-story-container">
      <Scrollytelling
        videoSrc={cycloneVideo}
        chapters={chapters}
      />
    </div>
  );
}

export default CyclonePage;
