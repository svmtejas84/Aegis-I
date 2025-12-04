// src/pages/EarthquakePage.js

import React from 'react';
import Scrollytelling from '../componenets/Scrollytelling.jsx';
import earthquakeVideo from '../assets/earthquake-animation.mp4';


const earthquakeChapters = [
  {
    title: "The Earth Trembles",
    text: "An **earthquake** is the sudden shaking of the Earth's surface caused by a rapid release of energy in the Earth's lithosphere, creating seismic waves.",
    // Note: Tune these ranges to match your video timing
    range: [0, 15] 
  },
  {
    title: "Tectonic Plates",
    text: "Most earthquakes occur at the boundaries of **tectonic plates**. These massive pieces of the Earth's crust are constantly moving, but they sometimes get stuck.",
    range: [18, 38] 
  },
  {
    title: "Fault Lines and Stress",
    text: "When plates get locked, **stress builds up** along a **fault line**. The longer they are stuck, the more energy is stored, like pulling back a rubber band.",
    range: [42, 62] 
  },
  {
    title: "The Release (The Quake)",
    text: "The moment the stress exceeds the strength of the rocks, the plates suddenly slip. This swift, violent movement releases the stored energy as seismic waves.",
    range: [65, 85] 
  },
  {
    title: "Aftermath & Scale",
    text: "The severity is measured on the **Richter scale**. The primary dangers include collapsing structures, landslides, and sometimes, tsunamis.",
    range: [88, 100] 
  },
];

const EarthquakePage = () => {
  return (
    <Scrollytelling 
      videoSrc={earthquakeVideo}
      chapters={earthquakeChapters}
    />
  );
};

export default EarthquakePage;