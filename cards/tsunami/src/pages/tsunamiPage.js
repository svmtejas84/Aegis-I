import React from 'react';
import Scrollytelling from '../components/scrollytelling';
import TsunamiVideo from '../assets/tsunami-animation.mp4'; // Import your video

// 1. Define the Tsunami-specific video
const video = TsunamiVideo;

// 2. Define the Tsunami-specific story chapters
const tsunamiChapters = [
    {
        id: 'story-1',
        title: 'The Silent Trigger',
        text: 'A tsunami is a series of giant waves most often caused by a powerful underwater earthquake. When tectonic plates suddenly shift, the seafloor jerks upward, displacing a massive volume of water. These waves can travel at jet speeds (800+ km/h) in the deep ocean. As they approach shallow land they slow down, compress, and build into a devastatingly high wall of water.',
        range: [0.1, 0.35] // Show between 10% and 35% scroll
    },
    {
        id: 'story-2',
        title: 'Catastrophic Events',
        text: 'Notable historical tsunamis — key events listed below.',
        events: [
            '2004 Indian Ocean tsunami — December 26, 2004 (00:58 UTC)',
            '2011 Tōhoku (Japan) tsunami — March 11, 2011 (05:46 UTC)',
            '1960 Valdivia (Chile) tsunami — May 22, 1960 (19:11 UTC)'
        ],
        range: [0.4, 0.65] // Show between 40% and 65% scroll
    },
    {
        id: 'story-3',
        title: 'Preparedness Measures',
        text: 'Listen for official warnings. If you feel a strong quake, see the sea recede, or hear a loud roar, evacuate to high ground immediately and wait for the "all clear."',
        cta: {
            text: 'Go back',
            action: 'back',
            variant: 'dark'
        },
        range: [0.7, 0.9] // Show between 70% and 90% scroll
    }
];

function TsunamiPage() {
    return (
        <div className="tsunami-page">

            {/* 3. Pass the video and chapters to the component */}
            <Scrollytelling videoSrc={video} chapters={tsunamiChapters} />

            {/* 4. Additional page content removed (was content-after-scroll) */}
        </div>
    );
}


// Note: content-after-scroll markup and its runtime-injected styles were removed


export default TsunamiPage;