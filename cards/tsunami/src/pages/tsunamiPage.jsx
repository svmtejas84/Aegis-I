import React from 'react';
import Scrollytelling from '../components/scrollytelling.jsx';
import TsunamiVideo from '../assets/tsunami-animation.mp4';

const video = TsunamiVideo;

const tsunamiChapters = [
    {
        id: 'story-1',
        title: 'The Silent Trigger',
        text: 'A tsunami is born deep beneath the sea, when underwater earthquakes, landslides, or volcanic eruptions push massive waves outward across the ocean. These waves may travel silently for hours before rising with sudden, immense force as they near the coast.',
        range: [0.1, 0.35]
    },
    {
        id: 'story-2',
        title: 'Catastrophic Events ',
        text: ' India still carries the memory of the 2004 Indian Ocean tsunami, which struck without warning and devastated Tamil Nadu, Kerala, and the Andaman and Nicobar Islands, claiming over two lakh lives across nations. Around the world, Japan’s 2011 Tōhoku tsunami remains another reminder of the ocean’s unpredictable power - a moment that reshaped coastlines and hearts alike2004 Indian Ocean Tsunami: December 26, 2004, 7:58 AM (local time) / 00:58 UTC 2011 Tōhoku (Japan) Tsunami: March 11, 2011, 2:46 PM (local time) / 05:46 UTC 1960 Valdivia (Chile) Tsunami: May 22, 1960, 3:11 PM (local time) / 19:11 UTC   ',
        range: [0.4, 0.65]
    },
    {
        id: 'story-3',
        title: 'Preparedness Measures',
        text: 'Listen for offiIf you ever feel a strong earthquake near the coast or see the sea pull back unusually, don’t wait.Move immediately to higher ground. Stay tuned to official alerts, avoid low-lying areas and do not return to the shore until it is declared safe. In moments when the sea turns, calm action and timely movement are your greatest shields.cial warnings. If you feel a strong quake, see the sea recede, or hear a loud roar, evacuate to high ground immediately and wait for the "all clear."',
        cta: {
            text: 'Go back',
            action: 'back',
            variant: 'dark'
        },
        range: [0.7, 0.9]
    }
];

function TsunamiPage() {
    return (
        <div className="tsunami-page">
            <Scrollytelling videoSrc={video} chapters={tsunamiChapters} />
            {/* Additional page content removed (was content-after-scroll) */}
        </div>
    );
}

// Note: content-after-scroll markup and its runtime-injected styles were removed

export default TsunamiPage;
