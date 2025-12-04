// src/pages/BhopalgasPage.js

import React from 'react';
import Scrollytelling from '../componenets/Scrollytelling.jsx'; // Import the reusable component
import bhopalgasVideo from '/bhopal-animation.mp4'; // Import your NEW video asset

// 1. Define the "chapters" for the Bhopal gas tragedy story.
// Adjust time (in seconds) to match your video.
const chapters = [
  {
    time: 0,
    title: 'What is a man-made chemical disaster?',
    description: 'A man-made chemical disaster occurs when hazardous substances such as industrial chemicals, toxic gases, or flammable materials are accidentally released, posing immediate and long-term risks to health and the environment. Such incidents often happen in factories, storage facilities, or during transportation, and can spread rapidly if not contained.'
  },
  {
    time: 6,
    title: 'Bhopal and other major incidents',
    description: 'India experienced one of its worst in 1984, the Bhopal gas tragedy, when a leak of methyl isocyanate gas at a pesticide plant claimed thousands of lives and left lasting health impacts on the surrounding community. Globally, incidents like the 1986 Chernobyl chemical and radiation disaster remind us how human error or industrial failure can have far-reaching consequences.'
  },
  {
    time: 12,
    title: 'The Night of the Leak',
    description: 'In December 1984, a gas leak at the Union Carbide pesticide plant in Bhopal, India, released highly toxic methyl isocyanate (MIC) gas into the atmosphere.'
  },
  {
    time: 18,
    title: 'The Immediate Aftermath',
    description: 'The toxic cloud spread over the sleeping city, causing thousands of immediate deaths and widespread panic. Hospitals were overwhelmed by the sheer number of affected people.'
  },
  {
    time: 24,
    title: 'A Lasting Legacy',
    description: 'The disaster is one of the world\'s worst industrial incidents. Decades later, survivors and their families continue to suffer from chronic health issues and environmental contamination.'
  },
  {
    time: 30,
    title: 'If a leak happens nearby',
    description: 'If a chemical leak occurs nearby, move away from the source immediately and seek higher ground if the substance is heavier than air. Cover your nose and mouth with cloth, stay indoors if evacuation is not possible, and follow instructions from authorities. Avoid touching contaminated surfaces or consuming food and water that may have been exposed. Calm, prompt action is the most effective shield when facing hazards born of human activity.'
  }
];

/**
 * This page component "drives" the scrollytelling experience.
 * It passes the specific Bhopal gas tragedy video and chapter data
 * into your reusable Scrollytelling component.
 */
function BhopalgasPage() {
  return (
    <div className="bhopalgas-story-container">
      <Scrollytelling
        videoSrc={bhopalgasVideo}
        chapters={chapters}
      />
    </div>
  );
}

export default BhopalgasPage;
