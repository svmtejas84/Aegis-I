// src/pages/HeatwavesPage.jsx

import React from 'react';
import Scrollytelling from '../components/Scrollytelling'; // Import the reusable component
import heatwaveVideo from '../assets/heatwaves-animation.mp4'; // Import your NEW video asset

// 1. Define the "chapters" for the heatwave story.
// Adjust time (in seconds) to match your video.
const chapters = [
  {
    time: 0,
    title: 'The Heat Dome',
    description: 'A heatwave is a prolonged period of excessively hot weather. It often occurs when a high-pressure system stalls over an area, trapping hot air like a lid.'
  },
  {
    time: 5, // Example: at 5 seconds
    title: 'The Urban Island Effect',
    description: 'Cities become "urban heat islands" as concrete and asphalt absorb and radiate more heat than natural landscapes, amplifying the high temperatures.'
  },
  {
    time: 11, // Example: at 11 seconds
    title: 'Impact on Health and Environment',
    description: 'Extreme heat can cause serious health risks, such as heatstroke. It also strains power grids, withers crops, and increases the risk of wildfires.'
  }
];

/**
 * This page component "drives" the scrollytelling experience.
 * It passes the specific heatwave video and chapter data
 * into your reusable Scrollytelling component.
 */
function HeatwavesPage() {
  return (
    <div className="heatwave-story-container">
      <Scrollytelling
        videoSrc={heatwaveVideo}
        chapters={chapters}
      />
    </div>
  );
}

export default HeatwavesPage;
