// src/pages/UrbanfloodsPage.js

import React from 'react';
import Scrollytelling from '../components/Scrollytelling'; // Import the reusable component
import urbanfloodsVideo from '../assets/urbanfloods-animation.mp4'; // Import your NEW video asset

// 1. Define the "chapters" for the urban floods story.
// Each chapter has a range (scroll percentage) and text content
const chapters = [
  {
    range: [0, 33],
    title: 'The Concrete Jungle',
    text: 'Urban floods occur when rainfall overwhelms a city\'s drainage system. Unlike in nature, water can\'t be absorbed by concrete and asphalt surfaces.'
  },
  {
    range: [33, 66],
    title: 'Overwhelmed Systems',
    text: 'Drains and sewers, often clogged or outdated, quickly reach their maximum capacity. This forces excess water back onto the streets, causing rapid flooding.'
  },
  {
    range: [66, 100],
    title: 'The Ripple Effect',
    text: 'This flash flooding damages property, disrupts transportation, and creates significant public health risks as floodwaters mix with sewage.'
  }
];

/**
 * This page component "drives" the scrollytelling experience.
 * It passes the specific urban floods video and chapter data
 * into your reusable Scrollytelling component.
 */
function UrbanfloodsPage() {
  return (
    <div className="urbanfloods-story-container">
      <Scrollytelling
        videoSrc={urbanfloodsVideo}
        chapters={chapters}
      />
    </div>
  );
}

export default UrbanfloodsPage;
