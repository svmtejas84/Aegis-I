import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './scrollytelling.css';

function Scrollytelling({ videoSrc, chapters }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [activeChapter, setActiveChapter] = useState(null);
    const [scrollFraction, setScrollFraction] = useState(0);
    const navigate = useNavigate();

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

            let s = scrollAmount / scrollableHeight;
            if (s < 0) s = 0;
            if (s > 1) s = 1;

            requestAnimationFrame(() => {
                if (video.readyState >= 3) {
                    video.currentTime = video.duration * s;
                }
            });

            let currentChapter = null;
            for (const chapter of chapters) {
                if (s >= chapter.range[0] && s < chapter.range[1]) {
                    currentChapter = chapter.id;
                    break;
                }
            }
            setActiveChapter(currentChapter);
            setScrollFraction(s);
        };

        video.addEventListener('loadedmetadata', handleLoad);
        window.addEventListener('scroll', handleScroll);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoad);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [chapters]);

    return (
        <div id="video-container" ref={containerRef}>
            {/* fixed page title, always visible at top center */}
            <div className="page-title">TSUNAMI</div>
            <video id="scroll-video" ref={videoRef} preload="auto" muted playsInline>
                <source src={videoSrc} type="video/mp4" />
            </video>

            <div id="story-overlay">
                {chapters.map((chapter, idx) => (
                    <div
                        key={chapter.id}
                        className={`story-text ${activeChapter === chapter.id ? 'active' : ''}`}
                    >
                        <h3>{chapter.title}</h3>
                        {Array.isArray(chapter.events) ? (
                            <ul>
                                {chapter.events.map((ev, i) => (
                                    <li key={i}>{ev}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{chapter.text}</p>
                        )}

                        {/* render chapter CTA inline unless it's the final chapter (avoid duplicate) */}
                        {chapter.cta && (idx !== chapters.length - 1) ? (
                            <div className="story-cta">
                                <button
                                    className={`cta-button ${chapter.cta.variant === 'dark' ? 'dark' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (chapter.cta.action === 'back') navigate(-1);
                                        else if (chapter.cta.href) window.location.href = chapter.cta.href;
                                    }}
                                >
                                    {chapter.cta.text || 'Go'}
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            {/* Final CTA: shown once the page is essentially scrolled to the end or when the last chapter end is reached */}
            {chapters && chapters.length > 0 ? (() => {
                const last = chapters[chapters.length - 1];
                const lastEnd = last.range ? last.range[1] : 1;
                const finalThreshold = Math.max(0.98, lastEnd);
                const finalVisible = scrollFraction >= finalThreshold;
                return (
                    <div className={`final-cta ${finalVisible ? 'visible' : ''}`}>
                        {last.cta ? (
                            <button
                                className={`cta-button ${last.cta.variant === 'dark' ? 'dark' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (last.cta.action === 'back') navigate(-1);
                                    else if (last.cta.href) window.location.href = last.cta.href;
                                }}
                            >
                                {last.cta.text || 'Go back'}
                            </button>
                        ) : null}
                    </div>
                );
            })() : null}
        </div>
    );
}

export default Scrollytelling;
