import React, { useRef, useState, useEffect } from 'react';
import './scrollytelling.css';

// We accept two props: the video file, and an array of chapters
function Scrollytelling({ videoSrc, chapters }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [activeChapter, setActiveChapter] = useState(null);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        const handleLoad = () => {
            video.currentTime = 0;
            video.pause();
        };

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const scrollableHeight = container.scrollHeight - window.innerHeight;
            const scrollAmount = -containerRect.top;

            let scrollFraction = scrollAmount / scrollableHeight;
            if (scrollFraction < 0) scrollFraction = 0;
            if (scrollFraction > 1) scrollFraction = 1;

            // Update video time
            requestAnimationFrame(() => {
                if (video.readyState >= 3) { // Ensures video is ready to play
                    video.currentTime = video.duration * scrollFraction;
                }
            });

            // Update active chapter
            let currentChapter = null;
            for (const chapter of chapters) {
                if (scrollFraction >= chapter.range[0] && scrollFraction < chapter.range[1]) {
                    currentChapter = chapter.id;
                    break;
                }
            }
            setActiveChapter(currentChapter);
        };

        video.addEventListener('loadedmetadata', handleLoad);
        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            video.removeEventListener('loadedmetadata', handleLoad);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [chapters]); // Re-run effect if chapters change

    return (
        <div id="video-container" ref={containerRef}>
            <video id="scroll-video" ref={videoRef} preload="auto" muted playsInline>
                <source src={videoSrc} type="video/mp4" />
            </video>

            <div id="story-overlay">
                {chapters.map(chapter => (
                    <div
                        key={chapter.id}
                        className={`story-text ${activeChapter === chapter.id ? 'active' : ''}`}
                    >
                        <h3>{chapter.title}</h3>
                        <p>{chapter.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Scrollytelling;